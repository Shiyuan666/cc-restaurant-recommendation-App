package com.util;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.FilterConfig;
import java.io.IOException;

public class CORSFilter implements Filter {
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse) res;
		response.setHeader("Access-Control-Allow-Origin", "http://wywe.azurewebsites.net");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		response.setHeader("Access-Control-Allow-credentials", "true");
		response.addHeader("Access-Control-Allow-Headers", "Origin, Content-Type");
		chain.doFilter(req, res);
	}
	public void init(FilterConfig filterConfig) {}
	public void destroy() {}
}
