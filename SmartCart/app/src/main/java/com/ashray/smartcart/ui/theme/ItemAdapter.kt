package com.ashray.smartcart.ui.theme

import android.view.LayoutInflater
import android.view.ViewGroup
import com.ashray.smartcart.R
import androidx.recyclerview.widget.RecyclerView
import android.widget.TextView
import android.widget.ImageView
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide


class ItemAdapter(
    private var items: List<Item>,
    private val onAddClick: (Item) -> Unit,
    private val onItemClick: ((Item) -> Unit)? = null // <-- Add this
) : RecyclerView.Adapter<ItemAdapter.ItemViewHolder>() {

    class ItemViewHolder(val view: View) : RecyclerView.ViewHolder(view) {
        val title: TextView = view.findViewById(R.id.titleText)
        val price: TextView = view.findViewById(R.id.priceText)
        val rating: TextView = view.findViewById(R.id.ratingText)
        val image: ImageView = view.findViewById(R.id.productImage)
        val addBtn: Button = view.findViewById(R.id.addButton)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_layout, parent, false)
        return ItemViewHolder(view)
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {

        val item = items[position]
        holder.title.text = item.title
        holder.price.text = item.price
        holder.rating.text = item.rating
        Glide.with(holder.view.context).load(item.imageUrl).into(holder.image)

        holder.addBtn.setOnClickListener {
            onAddClick(item)
        }

        // Handle item click
        holder.view.setOnClickListener {
            onItemClick?.invoke(item)
        }
    }

    override fun getItemCount(): Int = items.size

    fun updateList(newItems: List<Item>) {
        items = newItems
        notifyDataSetChanged()
    }
}
