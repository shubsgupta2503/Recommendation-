package com.ashray.smartcart.ui.theme

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.ashray.smartcart.R
import androidx.recyclerview.widget.LinearLayoutManager


class OrdersAdapter : RecyclerView.Adapter<OrdersAdapter.OrderViewHolder>() {

    private var orders: List<Order> = emptyList()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_order_card, parent, false)
        return OrderViewHolder(view)
    }

    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        val order = orders[position]

        holder.orderPlatform.text = "Platform: ${order.platform}"
        holder.orderTotalPrice.text = "Total: Rs ${order.total_price}"

        // Setup inner RecyclerView for order items
        val itemAdapter = OrderItemAdapter(order.items)
        holder.orderItemsRecycler.adapter = itemAdapter
        holder.orderItemsRecycler.layoutManager = LinearLayoutManager(holder.itemView.context)
    }


    override fun getItemCount(): Int = orders.size

    fun submitList(newOrders: List<Order>) {
        orders = newOrders
        notifyDataSetChanged()
    }

    class OrderViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val orderPlatform: TextView = itemView.findViewById(R.id.orderPlatform)
        val orderTotalPrice: TextView = itemView.findViewById(R.id.orderTotalPrice)
        val orderItemsRecycler: RecyclerView = itemView.findViewById(R.id.orderItemsRecycler) // Make sure this matches the ID
    }

}
