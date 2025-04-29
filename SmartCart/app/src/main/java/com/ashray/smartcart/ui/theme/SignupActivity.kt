package com.ashray.smartcart.ui.theme

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ashray.smartcart.databinding.ActivitySignupBinding
import com.google.gson.Gson
import com.google.gson.JsonObject
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignupActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySignupBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivitySignupBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.loginRedirect.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }

        binding.signupButton.setOnClickListener {
            val firstname = binding.firstnameInput.text.toString().trim()
            val lastname = binding.lastnameInput.text.toString().trim()
            val email = binding.emailInput.text.toString().trim()
            val password = binding.passwordInput.text.toString().trim()
            val phone = binding.phoneInput.text.toString().trim()

            if (firstname.isNotEmpty() && lastname.isNotEmpty() &&
                email.isNotEmpty() && password.isNotEmpty() && phone.isNotEmpty()) {
                signup(email, password, firstname, lastname, phone)
            } else {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun signup(email: String, password: String, firstname: String, lastname: String, phone: String) {
        val request = SignupRequest(email, password, firstname, lastname, phone)

        ApiClient.authService.signup(request).enqueue(object : Callback<User> {
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful && response.body()?.email != "") {
                    val user = response.body()!!

                    val editor = getSharedPreferences("smartcart_prefs", Context.MODE_PRIVATE).edit()
                    editor.putString("firstname", user.firstname)
                    editor.putString("lastname", user.lastname)
                    editor.putString("email", user.email)
                    editor.putString("phone", user.phone)
                    editor.apply()

                    Toast.makeText(this@SignupActivity, "Signup successful!", Toast.LENGTH_SHORT).show()

                    val intent = Intent(this@SignupActivity, HomeActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                    finish()
                } else {
                    val errorMsg = parseErrorMessage(response.errorBody())
                    Toast.makeText(this@SignupActivity, errorMsg ?: "Signup failed", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                Toast.makeText(this@SignupActivity, "Network error: ${t.localizedMessage}", Toast.LENGTH_SHORT).show()
                Log.e("SignupError", t.localizedMessage ?: "Unknown error")
            }
        })
    }

    private fun parseErrorMessage(errorBody: ResponseBody?): String? {
        return try {
            val errorJson = errorBody?.string()
            val jsonObject = Gson().fromJson(errorJson, JsonObject::class.java)
            jsonObject.get("message")?.asString
        } catch (e: Exception) {
            Log.e("ParseError", "Failed to parse error message", e)
            null
        }
    }
}
