package com.axsos.pathVariables;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PathController {
	@RequestMapping("/daikichi/travel/{city}")
	public String travel(@PathVariable("city") String city, Model model) {
		model.addAttribute("city", city);
		return "travel";
	}
	
	@RequestMapping("/daikichi/lotto/{number}")
	public String lotto (@PathVariable("number") int number , Model model ) {
		model.addAttribute("number", number);
		if(number % 2==0) {
			model.addAttribute("message", "You will take a grand journey in the future , but be wary of tempting offers");
			
		}else {
			model.addAttribute("message", "You have enjoyed the fruits of your labor but now is a great time to spend time tith family and friends.");
			
		}
		return "lotto";
	}
	
}
