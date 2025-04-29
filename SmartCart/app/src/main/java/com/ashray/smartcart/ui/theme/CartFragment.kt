package com.ashray.smartcart.ui.theme

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager

import com.ashray.smartcart.databinding.FragmentCartBinding

import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CartFragment : Fragment() {

    private var _binding: FragmentCartBinding? = null
    private val binding get() = _binding!!

    private lateinit var cartAdapter: CartAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCartBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val items = CartManager.getCartItems()

        if (items.isEmpty()) {
            binding.emptyText.visibility = View.VISIBLE
            binding.cartRecycler.visibility = View.GONE
        } else {
            binding.emptyText.visibility = View.GONE
            binding.cartRecycler.visibility = View.VISIBLE

            cartAdapter = CartAdapter(items.toMutableList()) { item ->
                CartManager.removeFromCart(item)
                refreshCart()
            }

            refreshCart()

            binding.cartRecycler.layoutManager = LinearLayoutManager(requireContext())
            binding.cartRecycler.adapter = cartAdapter
        }

        // ✅ Checkout Button Logic
        binding.checkoutButton.setOnClickListener {
            if (::cartAdapter.isInitialized) {
                val (total, platform) = cartAdapter.getminimum()

                val sharedPref = requireContext().getSharedPreferences("smartcart_prefs", Context.MODE_PRIVATE)
                val email = sharedPref.getString("email", "") ?: ""

                val orderRequest = OrderRequest(
                    items = cartAdapter.getCurrentItems(),
                    total_price = total,
                    platform = platform,
                    email = email
                )

                ApiClient.authService.placeOrder(orderRequest).enqueue(object : Callback<Void> {
                    override fun onResponse(call: Call<Void>, response: Response<Void>) {
                        if (response.isSuccessful) {
                            Toast.makeText(requireContext(), "Order placed successfully!", Toast.LENGTH_SHORT).show()
                            CartManager.clearCart()
                            cartAdapter.updateList(emptyList())
                            refreshCart()
                        } else {
                            Toast.makeText(requireContext(), "Failed to place order!", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onFailure(call: Call<Void>, t: Throwable) {
                        Toast.makeText(requireContext(), "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                    }
                })
            }
        }
    }

    private fun refreshCart() {
        val items = CartManager.getCartItems()
        cartAdapter.updateList(items)
        binding.emptyText.visibility = if (items.isEmpty()) View.VISIBLE else View.GONE
        binding.cartRecycler.visibility = if (items.isEmpty()) View.GONE else View.VISIBLE

        val (amz, fkrt, jmrt) = cartAdapter.calculateTotals()
        val (minimumTotal, platform) = cartAdapter.getminimum()

        binding.textViewAmazonTotal.text = "Amazon Total: ₹$amz"
        binding.textViewFlipkartTotal.text = "Flipkart Total: ₹$fkrt"
        binding.textViewJiomartTotal.text = "JioMart Total: ₹$jmrt"
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
