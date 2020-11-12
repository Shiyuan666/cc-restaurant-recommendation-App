package com;

import com.util.YelpFusionAPI;

public class main {
	public static void main(String[] args) {
		String term = "Chinese";                       // term
		String location = "";            // location
		String latitude = "40.70544486444615";
		String longitude = "-73.99429321289062";
		String price = "1";                         // price        1 = $, 2 = $$, 3 = $$$, 4 = $$$$
		if(location == null || location.length() == 0) {
			YelpFusionAPI.searchRestaurants(term, latitude, longitude, price);
		} else {
			YelpFusionAPI.searchRestaurants(term, location, latitude, longitude, price);
		}
	}
}
