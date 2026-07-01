package com.axsos.OmikujiForm;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class OmikujiController {
	
	@GetMapping("/omikuji")
	public String showForm() {
		return "omikuji";
	}
	
	@PostMapping("/omikuji")
	public String processForm(@RequestParam("number") int number ,
			@RequestParam("city") String city , 
			@RequestParam("person") String person ,
			@RequestParam("hobby") String hobby ,
			@RequestParam("livingThing") String livingThing,
			@RequestParam("message") String message,
			HttpSession session) {
	session.setAttribute("number", number);
	session.setAttribute("city", city);
	session.setAttribute("person", person);
	session.setAttribute("hobby" , hobby);
	session.setAttribute("livingThing" , livingThing);
	session.setAttribute("message" , message);
	
	return "redirect:/omikuji/show";
	}
	
	@GetMapping("/omikuji/show")
	public String showFortune() {
		return "show";
	}
	
}