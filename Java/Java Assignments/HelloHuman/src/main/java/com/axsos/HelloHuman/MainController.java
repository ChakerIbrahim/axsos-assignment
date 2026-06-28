package com.axsos.HelloHuman;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
	
	@RequestMapping("/")
	@ResponseBody
	public String hello(
		@RequestParam(defaultValue = "Human") String name,
		@RequestParam(defaultValue = "")String last_name,
		@RequestParam(defaultValue = "1") int times
)	{
		String greeting = "Hello" + name;
		
		if(!last_name.equals("")) {
			greeting = "Hello" +  name + " " + last_name;
		}
		String result = "";
		for (int i=0; i<times; i++) {
			result += greeting + " ";
		}
		return result.trim();
	}
}
