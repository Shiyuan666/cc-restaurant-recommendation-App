package com.service;

import com.common.ServerResponse;
import com.pojo.RestaurantInfo;
import org.json.JSONObject;

public interface IRecommendService {
	ServerResponse<String> getRecommend(String term, String location, String latitude,
											String longitude, String price);
	ServerResponse<String> getRecommend(RestaurantInfo restaurantInfo);
	ServerResponse<String> getRecommendByID(String restaurantID);
}
