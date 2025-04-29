package com.ashray.smartcart.ui.theme

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ashray.smartcart.databinding.ActivityLoginBinding
import com.google.gson.Gson
import com.google.gson.JsonObject
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Auto-login if already signed in
        val prefs = getSharedPreferences("smartcart_prefs", MODE_PRIVATE)
        val userJson = prefs.getString("firstname", null)

        if (!userJson.isNullOrEmpty()) {
            val intent = Intent(this, HomeActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            startActivity(intent)
            finish()
            return
        }

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.signUpRedirect.setOnClickListener {
            startActivity(Intent(this, SignupActivity::class.java))
        }

        binding.loginButton.setOnClickListener {
            val email = binding.emailInput.text.toString().trim()
            val password = binding.passwordInput.text.toString().trim()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                login(email, password)
            } else {
                Toast.makeText(this, "Please enter both email and password", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun login(email: String, password: String) {
        val request = LoginRequest(email, password)

        ApiClient.authService.login(request).enqueue(object : Callback<User> {
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful && response.body()?.email != "") {
                    val user = response.body()!!

                    val editor = getSharedPreferences("smartcart_prefs", Context.MODE_PRIVATE).edit()
                    editor.putString("firstname", user.firstname)
                    editor.putString("lastname", user.lastname)
                    editor.putString("email", user.email)
                    editor.putString("phone", user.phone)
                    editor.apply()

                    Toast.makeText(this@LoginActivity, "Login successful!", Toast.LENGTH_SHORT).show()

                    val intent = Intent(this@LoginActivity, HomeActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                    finish()
                } else {
                    val errorMsg = parseErrorMessage(response.errorBody())
                    Toast.makeText(this@LoginActivity, errorMsg ?: "Login failed", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                Toast.makeText(this@LoginActivity, "Network error: ${t.localizedMessage}", Toast.LENGTH_SHORT).show()
                Log.e("LoginError", t.localizedMessage ?: "Unknown error")
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
