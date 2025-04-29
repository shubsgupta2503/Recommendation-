package com.ashray.smartcart.ui.theme

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.ashray.smartcart.R
import com.google.android.material.button.MaterialButton
import com.google.android.material.snackbar.Snackbar

class ProfileFragment : Fragment() {

    private lateinit var fullNameTextView: TextView
    private lateinit var accountDetails: MaterialButton
    private lateinit var addressButton: MaterialButton
    private lateinit var ordersButton: MaterialButton
    private lateinit var paymentsButton: MaterialButton
    private lateinit var settingsButton: MaterialButton
    private lateinit var logoutButton: MaterialButton

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Initialize views
        fullNameTextView = view.findViewById(R.id.fullName)
        accountDetails = view.findViewById(R.id.accountDetails)
        addressButton = view.findViewById(R.id.addressButton)
        ordersButton = view.findViewById(R.id.ordersButton)
        paymentsButton = view.findViewById(R.id.paymentsButton)
        settingsButton = view.findViewById(R.id.settingButton)
        logoutButton = view.findViewById(R.id.logoutButton)

        // Load user data
        val sharedPref = requireContext().getSharedPreferences("smartcart_prefs", Context.MODE_PRIVATE)
        val firstName = sharedPref.getString("firstname", "") ?: ""
        val lastName = sharedPref.getString("lastname", "") ?: ""

        fullNameTextView.text = "$firstName $lastName"


        // Set click listeners
        accountDetails.setOnClickListener {
            startActivity(Intent(requireActivity(), AccountDetailsActivity::class.java))
            // Remove requireActivity().finish() - this was closing your app
        }
        addressButton.setOnClickListener {

             startActivity(Intent(requireActivity(), AddressActivity::class.java))
        }

        ordersButton.setOnClickListener {

             startActivity(Intent(requireActivity(), OrdersActivity::class.java))
        }

        paymentsButton.setOnClickListener {
            showSnackbar("Payment methods management coming soon")
            // startActivity(Intent(requireActivity(), PaymentsActivity::class.java))
        }

        settingsButton.setOnClickListener {
            showSnackbar("Opening settings")
             startActivity(Intent(requireActivity(), SettingsActivity::class.java))
        }

        logoutButton.setOnClickListener {
            performLogout(sharedPref)
        }
    }

    private fun performLogout(sharedPref: android.content.SharedPreferences) {
        sharedPref.edit().clear().apply()
        // Navigate to login screen
        startActivity(Intent(requireActivity(), LoginActivity::class.java))
        requireActivity().finish()  // This ensures the current activity is finished properly
    }

    private fun showSnackbar(message: String) {
        view?.let {
            Snackbar.make(it, message, Snackbar.LENGTH_SHORT).show()
        }
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         */
        @JvmStatic
        fun newInstance() = ProfileFragment()
    }
}