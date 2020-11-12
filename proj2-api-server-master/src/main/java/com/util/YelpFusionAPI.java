package com.util;

import java.io.IOException;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.Request.Builder;
import org.json.JSONArray;
import org.json.JSONObject;

public class YelpFusionAPI {

	private static final String API_KEY = "bvyEMh11Tx1VKb72hUhPHdoH62D3a-0vDQcI9vmJRKLBf0I5Ndj0mG302jWB1NVt2jUROSmZRwMn37JunF1xkHJM1oVgXlpcgMXSMLjvFe5usDP3HOT403mKu-mpXnYx";

	public static JSONObject searchRestaurants(String term, String location, String latitude,
											  String longitude, String price) {
		return searchRestaurantsWithLocation(term, location, latitude, longitude, price);
	}

	public static JSONObject searchRestaurants(String term, String latitude,
											  String longitude, String price) {
		return searchRestaurantsWithoutLocation(term, latitude, longitude, price);
	}

	public static JSONObject searchRestaurantsByID(String restaurantID) {
		return searchRestaurantsByIDPrivate(restaurantID);
	}

	public static JSONObject requestRestaurantInfo(JSONObject jsonObject) {
		JSONObject restaurantInfo = new JSONObject();
		restaurantInfo.put("name", jsonObject.get("name").toString());
		restaurantInfo.put("url", jsonObject.get("url").toString());
		restaurantInfo.put("image_url", jsonObject.get("image_url").toString());
		restaurantInfo.put("categories", jsonObject.get("categories").toString());
		return restaurantInfo;
	}

	private static JSONObject searchRestaurantsWithLocation(String term, String location, String latitude,
											   String longitude, String price) {
		OkHttpClient httpClient = new OkHttpClient();
		//String API_KEY = "bvyEMh11Tx1VKb72hUhPHdoH62D3a-0vDQcI9vmJRKLBf0I5Ndj0mG302jWB1NVt2jUROSmZRwMn37JunF1xkHJM1oVgXlpcgMXSMLjvFe5usDP3HOT403mKu-mpXnYx";
		Request request = new Builder()
				//sort by rating
				.url("https://api.yelp.com/v3/businesses/search?term=" + term
						+ "&location=" + location
						+ "&latitude=" + latitude + "&longitude=" + longitude + "&radius"
						+ "&limit=3&sort_by=rating&price=" + price)
				.get()
				.addHeader("authorization", "Bearer" + " " + API_KEY)
				.build();

		try {
			Response response = httpClient.newCall(request).execute();
			JSONObject jsonObject = new JSONObject(response.body().string().trim());       // parser
			//JSONArray myResponse = (JSONArray)jsonObject.get("businesses");
			return jsonObject;

		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	private static JSONObject searchRestaurantsWithoutLocation(String term, String latitude,
											  String longitude, String price) {
		OkHttpClient httpClient = new OkHttpClient();
		//String API_KEY = "bvyEMh11Tx1VKb72hUhPHdoH62D3a-0vDQcI9vmJRKLBf0I5Ndj0mG302jWB1NVt2jUROSmZRwMn37JunF1xkHJM1oVgXlpcgMXSMLjvFe5usDP3HOT403mKu-mpXnYx";
		Request request = new Builder()
				//sort by rating
				.url("https://api.yelp.com/v3/businesses/search?term=" + term
						+ "&latitude=" + latitude + "&longitude=" + longitude + "&radius"
						+ "&limit=3&sort_by=rating&price=" + price)
				.get()
				.addHeader("authorization", "Bearer" + " " + API_KEY)
				.build();

		try {
			Response response = httpClient.newCall(request).execute();
			JSONObject jsonObject = new JSONObject(response.body().string().trim());       // parser
			//JSONArray myResponse = (JSONArray)jsonObject.get("businesses");
			return jsonObject;

		} catch (IOException e) {
			//e.printStackTrace();
			return null;
		}
		//return null;
	}

	private static JSONObject searchRestaurantsByIDPrivate(String restaurantID) {
		OkHttpClient httpClient = new OkHttpClient();
		//String API_KEY = "bvyEMh11Tx1VKb72hUhPHdoH62D3a-0vDQcI9vmJRKLBf0I5Ndj0mG302jWB1NVt2jUROSmZRwMn37JunF1xkHJM1oVgXlpcgMXSMLjvFe5usDP3HOT403mKu-mpXnYx";
		Request request = new Builder()
				//sort by rating
				.url("https://api.yelp.com/v3/businesses/" + restaurantID)
				.get()
				.addHeader("authorization", "Bearer" + " " + API_KEY)
				.build();

		try {
			Response response = httpClient.newCall(request).execute();
			JSONObject jsonObject = new JSONObject(response.body().string().trim());       // parser
			return jsonObject;

		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		//return null;
	}


}
