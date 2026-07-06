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

        burgerService.save(burger);

        // Redirect (PRG pattern) so refreshing the page doesn't resubmit the form
        return "redirect:/";
    }
}
