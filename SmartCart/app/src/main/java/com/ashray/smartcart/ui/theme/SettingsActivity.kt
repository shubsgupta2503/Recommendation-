package com.ashray.smartcart.ui.theme

import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.ashray.smartcart.R

class SettingsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        // Back button
        findViewById<ImageView>(R.id.backButton).setOnClickListener {
            finish()
        }
    }
}