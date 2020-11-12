package com.service.impl;

import com.common.ServerResponse;
import com.pojo.RestaurantInfo;
import com.util.YelpFusionAPI;
import com.service.IRecommendService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service("iRecommendService")
public class RecommendServiceImpl implements IRecommendService {

	@Override
	public ServerResponse<String> getRecommend(String term, String location, String latitude,
												   String longitude, String price) {

		if(location == null || location.length() == 0) {
			if(latitude == null || latitude.length() == 0 || longitude == null || longitude.length() == 0) {
				return ServerResponse.createByErrorMessage("You must specify either location or longitude and latitude");
			}
		}

		if(term == null || price == null || term.length() == 0 || price.length() == 0) {
			return ServerResponse.createByErrorMessage("You must specify term and price");
		}

		JSONObject jsonObject;
		if(location == null || location.length() == 0) {
			jsonObject = YelpFusionAPI.searchRestaurants(term, latitude, longitude, price);
		} else {
			jsonObject = YelpFusionAPI.searchRestaurants(term, location, latitude, longitude, price);
		}

		if(jsonObject == null || jsonObject.has("businesses") == false) {
			return ServerResponse.createByErrorMessage("No restaurant found");
		}

		JSONArray myResponse = (JSONArray)jsonObject.get("businesses");
		return ServerResponse.createBySuccess("Successfully found restaurants", myResponse.toString());
	}

	@Override
	public ServerResponse<String> getRecommend(RestaurantInfo restaurantInfo) {

		String location = restaurantInfo.getLocation();
		String latitude = restaurantInfo.getLatitude();
		String term = restaurantInfo.getTerm();
		String longitude = restaurantInfo.getLongitude();
		String price = restaurantInfo.getPrice();

		if(location == null || location.length() == 0) {
			if(latitude == null || latitude.length() == 0 || longitude == null || longitude.length() == 0) {
				return ServerResponse.createByErrorMessage("You must specify either location or longitude and latitude");
			}
		}

		if(term == null || price == null || term.length() == 0 || price.length() == 0) {
			return ServerResponse.createByErrorMessage("You must specify term and price");
		}

		JSONObject jsonObject;
		if(location == null || location.length() == 0) {
			jsonObject = YelpFusionAPI.searchRestaurants(term, latitude, longitude, price);
		} else {
			jsonObject = YelpFusionAPI.searchRestaurants(term, location, latitude, longitude, price);
		}

		if(jsonObject == null || jsonObject.has("businesses") == false) {
			return ServerResponse.createByErrorMessage("No restaurant found");
		}

		JSONArray myResponse = (JSONArray)jsonObject.get("businesses");
		return ServerResponse.createBySuccess("Successfully found restaurants", myResponse.toString());
	}

	@Override
	public ServerResponse<String> getRecommendByID(String restaurantID) {
		if(restaurantID == null || restaurantID.length() == 0) {
			return ServerResponse.createByErrorMessage("No restaurant found according to this ID");
		}
		JSONObject jsonObject = YelpFusionAPI.searchRestaurantsByID(restaurantID);
		if(jsonObject == null || jsonObject.has("url") == false) {
			return ServerResponse.createByErrorMessage("No restaurant URL found according to this ID");
		}
		JSONObject restaurantInfo = YelpFusionAPI.requestRestaurantInfo(jsonObject);
		return ServerResponse.createBySuccess("Successfully found restaurants", restaurantInfo.toString());
	}
}
