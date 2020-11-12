package com.controller;

import com.pojo.RestaurantInfo;
import com.service.IRecommendService;
import com.common.ServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.json.JSONObject;

@Controller
@RequestMapping("/yelp-fusion/")
public class RecommendController {

	@Autowired
	private IRecommendService iRecommendService;

	@RequestMapping(value = "requestRecommend.do", method = RequestMethod.POST)
	@ResponseBody
	public ServerResponse<String> getRecommend(String term, String location, String latitude,
												   String longitude, String price){
		ServerResponse<String> response = iRecommendService.getRecommend(term, location,latitude,
				longitude, price);

		return response;
	}

	@RequestMapping(value = "requestRecommendJsonPost.do", method = RequestMethod.POST)
	@ResponseBody
	public ServerResponse<String> getRecommend(@RequestBody RestaurantInfo restaurantInfo){
		ServerResponse<String> response = iRecommendService.getRecommend(restaurantInfo);
		return response;
	}

	@RequestMapping(value = "requestRecommendByID.do", method = RequestMethod.POST)
	@ResponseBody
	public ServerResponse<String> getRecommendByID(String restaurantID){
		ServerResponse<String> response = iRecommendService.getRecommendByID(restaurantID);
		return response;
	}

}
