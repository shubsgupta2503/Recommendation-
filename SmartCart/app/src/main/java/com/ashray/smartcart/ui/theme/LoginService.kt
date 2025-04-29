package com.ashray.smartcart.ui.theme


import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query


data class LoginRequest(val email: String, val password: String)
data class SignupRequest(val email: String, val password: String,val firstname: String, val lastname: String, val phone: String)
data class User(
    val firstname: String,
    val lastname: String,
    val email: String,
    val password: String,
    val phone: String
)
data class OrderRequest(
    val items: List<Item>,
    val total_price: Int,
    val platform: String,
    val email: String
)
data class Order(
    val id: String,  // Or Int depending on your backend
    val items: List<Item>,
    val total_price: Int,
    val platform: String,
    val email: String,

)
data class OrdersResponse(
    val orders: List<Order>
)
data class Address(
    val email: String,
    val name: String,
    val addressLine: String,
    val city: String,
    val zipCode: String,
    val phone: String
)




interface LoginService{
    @POST("/login")
    fun login(@Body request: LoginRequest): Call<User>

    @POST("/signup")
    fun signup(@Body request: SignupRequest): Call<User>

    @GET("/user")
    fun getUser() : Call<User>
    @GET("/orders")
    fun getOrders(@Query("email") email: String): Call<OrdersResponse>
    @POST("/neworder")
    fun placeOrder(@Body orderRequest: OrderRequest): Call<Void>

    @POST("/saveaddress")
    fun saveAddress(@Body address: Address): Call<Void>

    @GET("/address")
    fun getAddresses(@Query("email") email: String): Call<List<Address>>



}
