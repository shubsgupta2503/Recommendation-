package com.ashray.smartcart.ui.theme

import android.content.Context
import android.os.Bundle
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ashray.smartcart.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class OrdersActivity : AppCompatActivity() {

    private lateinit var ordersRecyclerView: RecyclerView
    private val ordersAdapter = OrdersAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_orders)

        // Back button functionality
        findViewById<ImageView>(R.id.backButton).setOnClickListener {
            finish()
        }

        val sharedPref = getSharedPreferences("smartcart_prefs", Context.MODE_PRIVATE)
        val email = sharedPref.getString("email", "") ?: ""

        // Setup RecyclerView for displaying orders
        ordersRecyclerView = findViewById(R.id.ordersContainer)
        ordersRecyclerView.layoutManager = LinearLayoutManager(this)
        ordersRecyclerView.adapter = ordersAdapter

        // Fetch orders from API
        fetchOrders(email)
    }

    private fun fetchOrders(email: String) {
        ApiClient.authService.getOrders(email).enqueue(object : Callback<OrdersResponse> {
            override fun onResponse(call: Call<OrdersResponse>, response: Response<OrdersResponse>) {
                if (response.isSuccessful) {
                    val orders = response.body()?.orders
                    if (orders != null) {
                        ordersAdapter.submitList(orders)
                    }
                } else {
                    Toast.makeText(this@OrdersActivity, "Failed to fetch orders", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<OrdersResponse>, t: Throwable) {
                Toast.makeText(this@OrdersActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
