package com.controller;

import com.common.ServerResponse;
import com.service.IP2pService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
@RequestMapping("/p2p/")
public class P2pController {

	@Autowired
	private IP2pService iP2pService;

	@RequestMapping(value = "getID.do", method = RequestMethod.GET)
	@ResponseBody
	public ServerResponse<String> getP2pID() throws IOException {
		ServerResponse<String> response = iP2pService.getID();
		return response;
 	}

	@RequestMapping(value = "saveID.do", method = RequestMethod.POST)
	@ResponseBody
	public ServerResponse<String> saveID(String inputID) throws IOException {
		ServerResponse<String> response = iP2pService.saveID(inputID);
		return response;
	}

	@RequestMapping(value = "deleteAllID.do", method = RequestMethod.DELETE)
	@ResponseBody
	public ServerResponse<String> deleteAllID() throws IOException {
		ServerResponse<String> response = iP2pService.deleteAllID();
		return response;
	}

	@RequestMapping(value = "deleteByID.do", method = RequestMethod.DELETE)
	@ResponseBody
	public ServerResponse<String> deleteByID(String inputID) throws IOException {
		ServerResponse<String> response = iP2pService.deleteByID(inputID);
		return response;
	}
}
