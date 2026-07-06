package com.axsos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.axsos.models.LoginUser;
import com.axsos.models.User;

import jakarta.validation.Valid;

@Controller
public class HomeController {
	
	@GetMapping("/")
	public String index(Model model) {
		model.addAttribute("newUser", new User());
		model.addAttribute("newLogin", new loginUser());
		return "index";
	}
	
	@PostMapping("/register")
	public String register(@Valid @ModelAttribute("newUser") User newUser, BindingResult result, Model model) {
		
		if(!newUser.getPassword().equals(newUser.getConfirm())) {
			result.rejectValue("confirm", "matches", "Passwords do not match!");
			
		}
		
		if(result.hasErrors()) {
			model.addAttribute("newLogin", new LoginUser());
			return "index";
		}
		
		return "redirect:/dashboard";
		
	}
	@PostMapping("/login")
	public String login(
			@Valid @ModelAttribute("newLogin") LoginUser newLogin,
			BindingResult result,
			Model model) {
		if(result.hasErrors()) {
			model.addAttribute("newUser", new User());
			return "index";
		}
		
		return"redirect:/dashboard";
	}
}
