package com.ashray.smartcart.ui.theme

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import com.ashray.smartcart.R
import com.bumptech.glide.Glide
import com.ashray.smartcart.databinding.FragmentProductDetailBinding
class ProductDetailFragment : Fragment() {

    private lateinit var item: Item

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        item = arguments?.getSerializable("item") as Item
    }

    private fun openUrl(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        startActivity(intent)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_product_detail, container, false)

        // Set basic product info
        view.findViewById<TextView>(R.id.detailTitle).text = item.title
        view.findViewById<TextView>(R.id.detailReviews).text = "${item.reviews} Reviews"
//        view.findViewById<TextView>(R.id.details).text = "₹${item.price}"
//        view.findViewById<TextView>(R.id.detailRating).text = "Rating: ${item.rating} ★"
        Glide.with(requireContext()).load(item.imageUrl).into(view.findViewById(R.id.detailImage))

        // Amazon details
        view.findViewById<TextView>(R.id.amazonPrice).text = "${item.amazonPrice}"
        view.findViewById<TextView>(R.id.amazonRating).text = "${item.amazonRating} ★"

        // Flipkart details
        view.findViewById<TextView>(R.id.flipkartPrice).text = "${item.flipkartPrice}"
        view.findViewById<TextView>(R.id.flipkartRating).text = "${item.flipkartRating} ★"

        // JioMart details
        view.findViewById<TextView>(R.id.jiomartPrice).text = "${item.jiomartPrice}"
        view.findViewById<TextView>(R.id.jiomartRating).text = "${item.jiomartRating} ★"

        // Add to Cart
        view.findViewById<Button>(R.id.addToCartDetail).setOnClickListener {
            CartManager.addToCart(item)
            Toast.makeText(requireContext(), "Added to cart", Toast.LENGTH_SHORT).show()
        }

        // Platform click listeners
        view.findViewById<View>(R.id.amz).setOnClickListener {
            item.amazonUrl?.let { openUrl(it) }
        }

        view.findViewById<View>(R.id.fkrt).setOnClickListener {
            item.flipkartUrl?.let { openUrl(it) }
        }

        view.findViewById<View>(R.id.jmrt).setOnClickListener {
            item.jiomartUrl?.let { openUrl(it) }
        }

        return view
    }


    companion object {
        fun newInstance(item: Item): ProductDetailFragment {
            val fragment = ProductDetailFragment()
            val args = Bundle()
            args.putSerializable("item", item)
            fragment.arguments = args
            return fragment
        }
    }
}
