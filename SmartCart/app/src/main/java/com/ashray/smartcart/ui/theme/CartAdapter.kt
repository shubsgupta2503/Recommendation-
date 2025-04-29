package com.ashray.smartcart.ui.theme

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.recyclerview.widget.RecyclerView
import com.ashray.smartcart.R
import com.bumptech.glide.Glide
import retrofit2.Call
import retrofit2.Response

class CartAdapter(
    private var items: MutableList<Item>,
    private val onRemoveClick: (Item) -> Unit
) : RecyclerView.Adapter<CartAdapter.CartViewHolder>() {

    class CartViewHolder(val view: View) : RecyclerView.ViewHolder(view) {
        val cartTitle: TextView = view.findViewById(R.id.cartTitle)
        val cartProductImage: ImageView = view.findViewById(R.id.cartProductImage)
        val removeButton: Button = view.findViewById(R.id.removeButton)
//        val storeLogo: ImageView = view.findViewById(R.id.storeLogo)

        val amazonPrice: TextView = view.findViewById(R.id.amazonPrice)
        val flipkartPrice: TextView = view.findViewById(R.id.flipkartPrice)
        val jiomartPrice: TextView = view.findViewById(R.id.jiomartPrice)

        val amzn: LinearLayout = view.findViewById(R.id.amzn)
        val fkrt: LinearLayout = view.findViewById(R.id.fkrt)
        val jmrt: LinearLayout = view.findViewById(R.id.jmrt)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CartViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.cart_item_layout, parent, false)
        return CartViewHolder(view)
    }

    private fun openUrl(context: Context, url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        context.startActivity(intent)
    }

    override fun onBindViewHolder(holder: CartViewHolder, position: Int) {
        val item = items[position]

        holder.cartTitle.text = item.title
        Glide.with(holder.view.context).load(item.imageUrl).into(holder.cartProductImage)

        // Set all platform prices
        holder.amazonPrice.text = item.amazonPrice.ifBlank { "N/A" }
        holder.flipkartPrice.text = item.flipkartPrice.ifBlank { "N/A" }
        holder.jiomartPrice.text = item.jiomartPrice.ifBlank { "N/A" }
        val sharedPref = holder.itemView.context.getSharedPreferences("smartcart_prefs", Context.MODE_PRIVATE)

        val email = sharedPref.getString("email", "") ?: ""
        // Set store logo based on URL
//        val logoRes = when {
//            item.url.contains("amazon", ignoreCase = true) -> R.drawable.logo_amazon
//            item.url.contains("flipkart", ignoreCase = true) -> R.drawable.logo_flipkart
//            item.url.contains("jiomart", ignoreCase = true) -> R.drawable.logo_jiomart
//            else -> R.drawable.ic_unknown_store
//        }
//        holder.storeLogo.setImageResource(logoRes)

        // Remove button click
        holder.removeButton.setOnClickListener {
            onRemoveClick(item)
        }





        holder.amzn.setOnClickListener {
            openUrl(holder.itemView.context, item.amazonUrl)
        }

        holder.fkrt.setOnClickListener {
            openUrl(holder.itemView.context, item.flipkartUrl)
        }

        holder.jmrt.setOnClickListener {
            openUrl(holder.itemView.context, item.jiomartUrl)
        }

        // Open original product link
//        holder.storeLogo.setOnClickListener {
//            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(item.url))
//            it.context.startActivity(intent)
//        }
    }
    fun getCurrentItems(): List<Item> {
        return items
    }

    fun getminimum(): Pair<Int, String> {
        val (amazonTotal, flipkartTotal, jiomartTotal) = calculateTotals()

        val platformTotals = mapOf(
            "Amazon" to amazonTotal,
            "Flipkart" to flipkartTotal,
            "JioMart" to jiomartTotal
        )

        val minEntry = platformTotals.minByOrNull { it.value } ?: return Pair(0, "None")
        return Pair(minEntry.value, minEntry.key)
    }
    fun calculateTotals(): Triple<Int, Int, Int> {
        var amazonTotal = 0
        var flipkartTotal = 0
        var jiomartTotal = 0

        for (item in items) {
            Log.i("brobro", item.toString())
            amazonTotal += item.amazonPrice.filter { it.isDigit() }.toIntOrNull() ?: 0
            flipkartTotal += item.flipkartPrice.filter { it.isDigit() }.toIntOrNull() ?: 0
            jiomartTotal += item.jiomartPrice.filter { it.isDigit() }.toIntOrNull() ?: 0
        }

        return Triple(amazonTotal, flipkartTotal, jiomartTotal)
    }

    override fun getItemCount(): Int = items.size

    fun updateList(newItems: List<Item>) {
        items = newItems.toMutableList()
        calculateTotals()
        notifyDataSetChanged()
    }
}
