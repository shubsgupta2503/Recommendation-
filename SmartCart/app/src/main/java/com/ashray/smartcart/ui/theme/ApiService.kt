package com.ashray.smartcart.ui.theme

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import java.io.Serializable

data class Item(
    val title: String = "",
    @SerializedName("amazon_price") val amazonPrice: String = "",
    @SerializedName("flipkart_price") val flipkartPrice: String = "",
    @SerializedName("jiomart_price") val jiomartPrice: String = "",
    @SerializedName("amazon_rating") val amazonRating: String = "",
    @SerializedName("flipkart_rating") val flipkartRating: String = "",
    @SerializedName("jiomart_rating") val jiomartRating: String = "",
    val reviews: String = "",
    @SerializedName("amazon_url") val amazonUrl: String = "",
    @SerializedName("flipkart_url") val flipkartUrl: String = "",
    @SerializedName("jiomart_url") val jiomartUrl: String = "",
    @SerializedName("image_url") val imageUrl: String = "",

    val price: String = "",
    val rating: String = "",
    val url: String = "",
): Serializable, Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString()
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(title)
        parcel.writeString(amazonPrice)
        parcel.writeString(flipkartPrice)
        parcel.writeString(jiomartPrice)
        parcel.writeString(amazonRating)
        parcel.writeString(flipkartRating)
        parcel.writeString(jiomartRating)
        parcel.writeString(reviews)
        parcel.writeString(amazonUrl)
        parcel.writeString(flipkartUrl)
        parcel.writeString(jiomartUrl)
        parcel.writeString(imageUrl)
        parcel.writeString(price)
        parcel.writeString(rating)
        parcel.writeString(url)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Item> {
        override fun createFromParcel(parcel: Parcel): Item {
            return Item(parcel)
        }

        override fun newArray(size: Int): Array<Item?> {
            return arrayOfNulls(size)
        }
    }
}

data class Resp(
    val items: List<Item>
)

//data class LoginRequest(val email: String, val password: String)
//data class SignupRequest(val email: String, val password: String,val firstname: String, val lastname: String, val phone: String)
//data class User(
//    val firstname: String,
//    val lastname: String,
//    val email: String,
//    val password: String,
//    val phone: String
//)

interface ApiService {
//    @POST("/login")
//    fun login(@Body request: LoginRequest): Call<User>
//
//    @POST("/signup")
//    fun signup(@Body request: SignupRequest): Call<User>

    @GET("/api/staples")
    fun getAllProducts(): Call<Resp>

    @GET("/api/snacks")
    fun getSnacks(): Call<Resp>

    @GET("/api/dairy_eggs")
    fun getMilkProducts(): Call<Resp>

    @GET("/api/staples")
    fun getGroceries(): Call<Resp>

    @GET("/api/personal")
    fun getPersonal(): Call<Resp>

    @GET("/api/packaged")
    fun getPackaged(): Call<Resp>

    @GET("/api/household")
    fun getHousehold(): Call<Resp>
}
