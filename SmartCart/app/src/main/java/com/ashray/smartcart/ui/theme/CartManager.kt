package com.ashray.smartcart.ui.theme


object CartManager {
    private val cartItems = mutableListOf<Item>()

    fun addToCart(item: Item) {
        cartItems.add(item)
    }

    fun removeFromCart(item: Item) {
        cartItems.remove(item)
    }

    fun getCartItems(): List<Item> = cartItems
    fun clearCart() {
        cartItems.clear()
    }
}