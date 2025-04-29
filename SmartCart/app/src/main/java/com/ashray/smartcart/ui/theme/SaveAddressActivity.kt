package com.ashray.smartcart.ui.theme

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ashray.smartcart.R
import com.ashray.smartcart.ui.theme.ApiClient.authService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SaveAddressActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_save_address)

        val backButton = findViewById<ImageView>(R.id.backButton)
        val saveButton = findViewById<Button>(R.id.saveButton)
        val nameEditText = findViewById<EditText>(R.id.nameEditText)
        val addressLineEditText = findViewById<EditText>(R.id.addressLineEditText)
        val cityEditText = findViewById<EditText>(R.id.cityEditText)
        val zipCodeEditText = findViewById<EditText>(R.id.zipCodeEditText)
        val phoneEditText = findViewById<EditText>(R.id.phoneEditText)

        // 🔙 Back button logic
        backButton.setOnClickListener {
            finish()
        }

        saveButton.setOnClickListener {
            val prefs = getSharedPreferences("smartcart_prefs", MODE_PRIVATE)
            val email = prefs.getString("email", null)
            val name = nameEditText.text.toString()
            val line = addressLineEditText.text.toString()
            val city = cityEditText.text.toString()
            val zip = zipCodeEditText.text.toString()
            val phone = phoneEditText.text.toString()

            if (name.isEmpty() || line.isEmpty() || city.isEmpty() || zip.isEmpty() || phone.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val address = email?.let { it1 -> Address(it1, name, line, city, zip, phone) }

            if (address != null) {
                authService.saveAddress(address).enqueue(object : Callback<Void> {
                    override fun onResponse(call: Call<Void>, response: Response<Void>) {
                        if (response.isSuccessful) {
                            Toast.makeText(this@SaveAddressActivity, "Address saved successfully", Toast.LENGTH_SHORT).show()
                            finish()
                        } else {
                            Toast.makeText(this@SaveAddressActivity, "Failed to save address", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onFailure(call: Call<Void>, t: Throwable) {
                        Toast.makeText(this@SaveAddressActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                    }
                })
            }
        }
    }
}
