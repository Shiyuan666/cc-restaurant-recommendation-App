package com.pojo;

public class RestaurantInfo {

	private String term;
	private String location;
	private String latitude;
	private String longitude;
	private String price;

	public RestaurantInfo(String term, String location, String latitude,
						  String longitude, String price) {
		this.term = term;
		this.location = location;
		this.latitude = latitude;
		this.longitude = longitude;
		this.price = price;
	}

	public String getTerm() {
		return term;
	}

	public void setTerm(String term) {
		this.term = term;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}
}
