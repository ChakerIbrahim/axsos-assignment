package com.axsos.burgertracker.controller;

import com.axsos.burgertracker.model.Burger;
import com.axsos.burgertracker.service.BurgerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

import javax.validation.Valid;

@Controller
public class BurgerController {

    private final BurgerService burgerService;

    public BurgerController(BurgerService burgerService) {
        this.burgerService = burgerService;
    }

    // GET / -> renders index.jsp with the table of burgers + an empty form
    @GetMapping("/")
    public String index(@ModelAttribute("burger") Burger burger, Model model) {
        model.addAttribute("burgers", burgerService.findAll());
        return "index";
    }

    // POST /burgers -> validates the submitted form and saves a new burger
    @PostMapping("/burgers")
    public String createBurger(@Valid @ModelAttribute("burger") Burger burger,
                                BindingResult bindingResult,
                                Model model) {

        if (bindingResult.hasErrors()) {
            // Validation failed: re-render the same page, showing the errors
            // and the burgers already in the database (form:errors reads
            // straight from bindingResult via the "burger" model attribute).
            model.addAttribute("burgers", burgerService.findAll());
            return "index";
        }

        burgerService.create(burger);

        // Redirect (PRG pattern) so refreshing the page doesn't resubmit the form
        return "redirect:/";
    }
    
    // NEW: shows the edit form, pre-filled with the burger's current data
    @GetMapping("/burgers/edit/{id}")
    public String editForm(@PathVariable("id") Long id, Model model) {
    	Optional<Burger> burgerOptional = burgerService.findById(id);
    	
    	if(burgerOptional.isEmpty()) {
            // no burger with that id - just go back to the dashboard
    		return "redirect:/";
    	}
    	
    	model.addAttribute("burger", burgerOptional.get());
    	return "edit";
    }
    
    // NEW: processes the edit form submission
    @PostMapping("/burgers/edit/{id}")
    public String updateBurger(@PathVariable("id") Long id,
    		@Valid @ModelAttribute("burger") Burger burger,
    		BindingResult bindingResult) {
    	

        // Make sure we're updating the burger the URL says we are,
        // regardless of what came through in the form itself.
    	burger.setId(id);
    	
    	if (bindingResult.hasErrors()) {
            // Re-render the SAME edit page with errors shown,
            // and the user's (invalid) input still in the fields.
    		return"edit";
    	}
    	burgerService.create(burger);
    	return "redirect:/";
    }
}
