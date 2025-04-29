package com.ashray.smartcart.ui.theme

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ashray.smartcart.R

// assuming you store email in shared prefs
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AddressActivity : AppCompatActivity() {

    private lateinit var addressListContainer: LinearLayout

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_address)

        findViewById<ImageView>(R.id.backButton).setOnClickListener {
            finish()
        }
        findViewById<Button>(R.id.addAddressButton).setOnClickListener {
            // Launch a new activity or show a dialog to add an address
            val intent = Intent(this, SaveAddressActivity::class.java)
            startActivity(intent)
        }

        val prefs = getSharedPreferences("smartcart_prefs", MODE_PRIVATE)
        val userEmail = prefs.getString("email", null)

        addressListContainer = findViewById(R.id.addressListContainer)




        if (userEmail != null) {
            fetchAddresses(userEmail)
        }
    }
    override fun onResume() {
        super.onResume()
        val prefs = getSharedPreferences("smartcart_prefs", MODE_PRIVATE)
        val userEmail = prefs.getString("email", null)
        if (userEmail != null) {
            fetchAddresses(userEmail)
        }
    }


    private fun fetchAddresses(email: String) {
        ApiClient.authService.getAddresses(email).enqueue(object : Callback<List<Address>> {
            override fun onResponse(call: Call<List<Address>>, response: Response<List<Address>>) {
                if (response.isSuccessful) {
                    val addresses = response.body() ?: emptyList()
                    displayAddresses(addresses)
                } else {
                    Toast.makeText(this@AddressActivity, "Failed to load addresses", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Address>>, t: Throwable) {
                Toast.makeText(this@AddressActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun displayAddresses(addresses: List<Address>) {
        val inflater = LayoutInflater.from(this)
        addressListContainer.removeAllViews()

        for (address in addresses) {
            val view = inflater.inflate(R.layout.address_card, addressListContainer, false)

            view.findViewById<TextView>(R.id.addressName).text = address.name
            view.findViewById<TextView>(R.id.addressLine).text = address.addressLine
            view.findViewById<TextView>(R.id.addressCityZip).text = "${address.city}, ${address.zipCode}"
            view.findViewById<TextView>(R.id.addressPhone).text = "Phone: ${address.phone}"

            addressListContainer.addView(view)
        }
    }
}
