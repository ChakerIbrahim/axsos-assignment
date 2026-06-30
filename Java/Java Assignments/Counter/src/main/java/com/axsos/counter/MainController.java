package com.axsos.counter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class MainController {

	public MainController() {
		// TODO Auto-generated constructor stub
	}
	
	@RequestMapping("/")
	public String index(HttpSession mySession) {
		
		if(mySession.getAttribute("counter") != null) {
			int counter =(int)mySession.getAttribute("counter");
			counter++;
			mySession.setAttribute("counter", counter);
			
		}
		else {
				//          key  -----> value
				mySession.setAttribute("counter", 1);
		}
		
		return "index";
	}
	@RequestMapping("/counter")
	public String counter(HttpSession chakerSession) {
		
		return "counter";
	}
	
}
