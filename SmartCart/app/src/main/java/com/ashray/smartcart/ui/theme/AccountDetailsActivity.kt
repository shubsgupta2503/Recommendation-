package com.ashray.smartcart.ui.theme

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.ashray.smartcart.R
import com.google.android.material.button.MaterialButton

class AccountDetailsActivity : AppCompatActivity() {

    private lateinit var tvFirstName: TextView
    private lateinit var tvLastName: TextView
    private lateinit var tvEmail: TextView
    private lateinit var tvMobile: TextView
    private lateinit var backButton: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_account_details)

        // Initialize TextViews
        tvFirstName = findViewById(R.id.tvFirstName)
        tvLastName = findViewById(R.id.tvLastName)
        tvEmail = findViewById(R.id.tvEmail)
        tvMobile = findViewById(R.id.tvMobile)
        backButton = findViewById(R.id.backButton)

        // Get user data from SharedPreferences
        val sharedPref = getSharedPreferences("smartcart_prefs", Context.MODE_PRIVATE)
        val firstname = sharedPref.getString("firstname", "") ?: ""
        val lastname = sharedPref.getString("lastname", "") ?: ""
        val email = sharedPref.getString("email", "") ?: ""
        val mobile = sharedPref.getString("phone", "") ?: ""

        // Set values to TextViews
        tvFirstName.text = firstname
        tvLastName.text = lastname
        tvEmail.text = email
        tvMobile.text = mobile

        // Set back button click listener
        backButton.setOnClickListener {
            finish() // Simply close this activity and return to previous one
        }
    }
}