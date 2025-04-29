package com.ashray.smartcart.ui.theme

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import androidx.core.widget.addTextChangedListener
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ashray.smartcart.R
import com.ashray.smartcart.databinding.FragmentHomeBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeFragment : Fragment() {

    private lateinit var binding: FragmentHomeBinding
    private lateinit var brobro: ScrollView
    private lateinit var allAdapter: ItemAdapter
    private lateinit var snackAdapter: ItemAdapter
    private lateinit var milkAdapter: ItemAdapter
    private lateinit var groceryAdapter: ItemAdapter
    private var allItems = listOf<Item>()
    private var snacks = listOf<Item>()
    private var milkProducts = listOf<Item>()
    private var groceries = listOf<Item>()

    private lateinit var personalAdapter: ItemAdapter
    private lateinit var packagedAdapter: ItemAdapter
    private lateinit var householdAdapter: ItemAdapter

    private var personalItems = listOf<Item>()
    private var packagedItems = listOf<Item>()
    private var householdItems = listOf<Item>()

    private lateinit var scrollView: ScrollView
    private lateinit var allSections: List<View>


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    private fun openProductDetail(item: Item) {
        val fragment = ProductDetailFragment.newInstance(item)
        requireActivity().supportFragmentManager.beginTransaction()
            .replace(R.id.nav_host_fragment, fragment)
            .addToBackStack(null)
            .commit()
    }

    private fun hideALl(){

    }

    private fun bro() {
        val rootView = requireView()

        val scrollView = rootView.findViewById<ScrollView>(R.id.homeScrollView)
        scrollView.visibility = View.VISIBLE

        val searchBar = rootView.findViewById<EditText>(R.id.searchBar)

//        val allText = rootView.findViewById<TextView>(R.id.allText)
        val snackText = rootView.findViewById<TextView>(R.id.snackst)
        val milkText = rootView.findViewById<TextView>(R.id.milkt)
        val groceryText = rootView.findViewById<TextView>(R.id.groceriest)
        val personalText = rootView.findViewById<TextView>(R.id.personalt)
        val packagedText = rootView.findViewById<TextView>(R.id.packagedt)
        val householdText = rootView.findViewById<TextView>(R.id.householdt)

//        val allRecycler = rootView.findViewById<RecyclerView>(R.id.allRecycler)
        val snackRecycler = rootView.findViewById<RecyclerView>(R.id.snackRecycler)
        val milkRecycler = rootView.findViewById<RecyclerView>(R.id.milkRecycler)
        val groceryRecycler = rootView.findViewById<RecyclerView>(R.id.groceryRecycler)
        val personalRecycler = rootView.findViewById<RecyclerView>(R.id.personalRecycler)
        val packagedRecycler = rootView.findViewById<RecyclerView>(R.id.packagedRecycler)
        val householdRecycler = rootView.findViewById<RecyclerView>(R.id.householdRecycler)
        brobro = rootView.findViewById<ScrollView>(R.id.brobro)

        val categoryViews = listOf(
            snackText to snackRecycler,
            milkText to milkRecycler,
            groceryText to groceryRecycler,
            personalText to personalRecycler,
            packagedText to packagedRecycler,
            householdText to householdRecycler
        )

        fun showCategoryOnly(textView: TextView, recyclerView: RecyclerView) {
            brobro.visibility = View.VISIBLE
            categoryViews.forEach { (tv, rv) ->
                tv.visibility = View.GONE
                rv.visibility = View.GONE
            }
            searchBar.visibility = View.VISIBLE

            textView.visibility = View.VISIBLE
            recyclerView.visibility = View.VISIBLE
        }

        rootView.findViewById<View>(R.id.snacks).setOnClickListener {
            showCategoryOnly(snackText, snackRecycler)
        }

        rootView.findViewById<View>(R.id.milk).setOnClickListener {
            showCategoryOnly(milkText, milkRecycler)
        }

        rootView.findViewById<View>(R.id.grocery).setOnClickListener {
            showCategoryOnly(groceryText, groceryRecycler)
        }

        rootView.findViewById<View>(R.id.personal).setOnClickListener {
            showCategoryOnly(personalText, personalRecycler)
        }

        rootView.findViewById<View>(R.id.packaged).setOnClickListener {
            showCategoryOnly(packagedText, packagedRecycler)
        }

        rootView.findViewById<View>(R.id.household).setOnClickListener {
            showCategoryOnly(householdText, householdRecycler)
        }
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {

        bro()
        allAdapter = ItemAdapter(allItems, {
            CartManager.addToCart(it)
            Toast.makeText(requireContext(), "Added to cart", Toast.LENGTH_SHORT).show()
        }) {
            openProductDetail(it)
        }
        snackAdapter = ItemAdapter(snacks, {
            CartManager.addToCart(it)
            Toast.makeText(requireContext(), "Added to cart", Toast.LENGTH_SHORT).show()
        }) {
            openProductDetail(it)
        }
        milkAdapter = ItemAdapter(milkProducts, {
            CartManager.addToCart(it)
            Toast.makeText(requireContext(), "Added to cart", Toast.LENGTH_SHORT).show()
        }) {
            openProductDetail(it)
        }
        groceryAdapter = ItemAdapter(groceries, {
            CartManager.addToCart(it)
            Toast.makeText(requireContext(), "Added to cart", Toast.LENGTH_SHORT).show()
        }) {
            openProductDetail(it)
        }
        householdAdapter = ItemAdapter(householdItems, {
            CartManager.addToCart(it)
            Toast.makeText(requireContext(), "Added to cart", Toast.LENGTH_SHORT).show()
        }) {
            openProductDetail(it)
        }
        personalAdapter = ItemAdapter(personalItems, {
            CartManager.addToCart(it)
            Toast.makeText(requireContext(), "Added to cart", Toast.LENGTH_SHORT).show()
        }) {
            openProductDetail(it)
        }
        packagedAdapter = ItemAdapter(packagedItems, {
            CartManager.addToCart(it)
            Toast.makeText(requireContext(), "Added to cart", Toast.LENGTH_SHORT).show()
        }) {
            openProductDetail(it)
        }


        binding.snackRecycler.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.milkRecycler.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.groceryRecycler.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.personalRecycler.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.packagedRecycler.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.householdRecycler.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)

        binding.snackRecycler.adapter = snackAdapter
        binding.milkRecycler.adapter = milkAdapter
        binding.groceryRecycler.adapter = groceryAdapter
        binding.personalRecycler.adapter = personalAdapter
        binding.householdRecycler.adapter = householdAdapter
        binding.packagedRecycler.adapter = packagedAdapter

        fetchItems()

        binding.searchBar.addTextChangedListener {
            val query = it.toString().trim().lowercase()
            filter(query)
        }
    }

    private fun parsePrice(priceStr: String): Int {
        return priceStr.replace("[^\\d]".toRegex(), "").toIntOrNull() ?: Int.MAX_VALUE
    }

    private fun fetchItems() {
        ApiClient.service.getAllProducts().enqueue(object : Callback<Resp> {
            override fun onResponse(call: Call<Resp>, response: Response<Resp>) {
                response.body()?.let {
                    allItems = it.items
                    allItems = it.items
                        .filter { item -> item.price != "N/A" }
                        .sortedBy { item -> parsePrice(item.price) }
                    allAdapter.updateList(allItems)
                }
            }

            override fun onFailure(call: Call<Resp>, t: Throwable) {}
        })

        ApiClient.service.getSnacks().enqueue(object : Callback<Resp> {
            override fun onResponse(call: Call<Resp>, response: Response<Resp>) {
                response.body()?.let {
                    snacks = it.items
                    snacks = it.items
                        .filter { item -> item.price != "N/A" }
                        .sortedBy { item -> parsePrice(item.price) }
                    snackAdapter.updateList(snacks)
                }
            }

            override fun onFailure(call: Call<Resp>, t: Throwable) {}
        })

        ApiClient.service.getMilkProducts().enqueue(object : Callback<Resp> {
            override fun onResponse(call: Call<Resp>, response: Response<Resp>) {
                response.body()?.let {
                    milkProducts = it.items
                    milkProducts = it.items
                        .filter { item -> item.price != "N/A" }
                        .sortedBy { item -> parsePrice(item.price) }
                    milkAdapter.updateList(milkProducts)
                }
            }

            override fun onFailure(call: Call<Resp>, t: Throwable) {}
        })

        ApiClient.service.getGroceries().enqueue(object : Callback<Resp> {
            override fun onResponse(call: Call<Resp>, response: Response<Resp>) {
                response.body()?.let {
                    groceries = it.items
                    groceries = it.items
                        .filter { item -> item.price != "N/A" }
                        .sortedBy { item -> parsePrice(item.price) }
                    groceryAdapter.updateList(groceries)
                }
            }

            override fun onFailure(call: Call<Resp>, t: Throwable) {}
        })

        ApiClient.service.getPackaged().enqueue(object : Callback<Resp> {
            override fun onResponse(call: Call<Resp>, response: Response<Resp>) {
                response.body()?.let {
                    packagedItems = it.items
                    packagedItems = it.items
                        .filter { item -> item.price != "N/A" }
                        .sortedBy { item -> parsePrice(item.price) }
                    packagedAdapter.updateList(packagedItems)
                }
            }

            override fun onFailure(call: Call<Resp>, t: Throwable) {}
        })

        ApiClient.service.getPersonal().enqueue(object : Callback<Resp> {
            override fun onResponse(call: Call<Resp>, response: Response<Resp>) {
                response.body()?.let {
                    personalItems = it.items
                    personalItems = it.items
                        .filter { item -> item.price != "N/A" }
                        .sortedBy { item -> parsePrice(item.price) }
                    personalAdapter.updateList(personalItems)
                }
            }

            override fun onFailure(call: Call<Resp>, t: Throwable) {}
        })

        ApiClient.service.getHousehold().enqueue(object : Callback<Resp> {
            override fun onResponse(call: Call<Resp>, response: Response<Resp>) {
                response.body()?.let {
                    householdItems = it.items
                    householdItems = it.items
                        .filter { item -> item.price != "N/A" }
                        .sortedBy { item -> parsePrice(item.price) }
                    householdAdapter.updateList(householdItems)
                }
            }

            override fun onFailure(call: Call<Resp>, t: Throwable) {}
        })
    }

    private fun filter(query: String) {
        allAdapter.updateList(allItems.filter { it.title.contains(query, true) })
        snackAdapter.updateList(snacks.filter { it.title.contains(query, true) })
        milkAdapter.updateList(milkProducts.filter { it.title.contains(query, true) })
        groceryAdapter.updateList(groceries.filter { it.title.contains(query, true) })
        personalAdapter.updateList(personalItems.filter { it.title.contains(query, true) })
        packagedAdapter.updateList(packagedItems.filter { it.title.contains(query, true) })
        householdAdapter.updateList(householdItems.filter { it.title.contains(query, true) })
    }
}