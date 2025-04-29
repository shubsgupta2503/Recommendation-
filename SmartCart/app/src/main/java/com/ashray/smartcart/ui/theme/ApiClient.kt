package com.ashray.smartcart.ui.theme

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiClient {
    private val backendRetrofit = Retrofit.Builder()
        .baseUrl("https://go-project-trial.onrender.com") // Or your server URL
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    private val loginRetrofit = Retrofit.Builder()
        .baseUrl("https://loginbackendsmartcart.onrender.com")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    val service: ApiService = backendRetrofit.create(ApiService::class.java)
    val authService: LoginService = loginRetrofit.create(LoginService::class.java)
}
