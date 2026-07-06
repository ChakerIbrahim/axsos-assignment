package com.axsos.burgertracker.controller;

import com.axsos.burgertracker.model.Burger;
import com.axsos.burgertracker.service.BurgerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

@Controller
public class BurgerController {
	
	private final BurgerService burgerService;
	
	@Autowired
	public BurgerController(BurgerService burgerService) {
		this.burgerService = burgerService;
	}
	
	@GetMapping("/")
	public String index(@ModelAttribute("burger") Burger burger, Model model) {
		model.addAttribute("burgers", burgerService.findAll());
		return "index";
	}
	
	@PostMapping("/burgers")
	public String createBurger(@Valid @ModelAttribute("burger") Burger burger, BindingResult bindingResult, Model model) {
		if (bindingResult.hasErrors()) {
			model.addAttribute("burgers", burgerService.findAll());
			return "index";
		}
		burgerService.save(burger);
		
		return "redirect:/";
	}
	
	
}
