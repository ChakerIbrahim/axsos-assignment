package com.chaker.dojosandninjas.controllers;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.chaker.dojosandninjas.models.Dojo;
import com.chaker.dojosandninjas.services.DojoService;

// @Controller marks this class as an MVC controller that returns JSP views
@Controller
public class DojoController {

    // The service this controller uses (controller -> service -> repository)
    private final DojoService dojoService;

    // Constructor injection: Spring passes the service in for us
    public DojoController(DojoService dojoService) {
        this.dojoService = dojoService;
    }

    // GET /dojos/new : shows the "New Dojo" form.
    // We pass an empty Dojo object for the form's data binding (modelAttribute).
    @GetMapping("/dojos/new")
    public String newDojo(@ModelAttribute("dojo") Dojo dojo) {
        return "newDojo.jsp";
    }

    // POST /dojos : receives the submitted form and creates the dojo.
    // @Valid + BindingResult handle validation errors.
    @PostMapping("/dojos")
    public String createDojo(@Valid @ModelAttribute("dojo") Dojo dojo,
                             BindingResult result) {
        // If the form has errors, re-render the form page
        if (result.hasErrors()) {
            return "newDojo.jsp";
        }
        // Otherwise save the dojo and go back to the new dojo form
        dojoService.createDojo(dojo);
        return "redirect:/dojos/new";
    }

    // GET /dojos/{id} : the dojo page that displays all ninjas
    // that belong to that specific location.
    @GetMapping("/dojos/{id}")
    public String showDojo(@PathVariable("id") Long id, Model model) {
        // Fetch the dojo out of the database through our service
        Dojo dojo = dojoService.findDojo(id);
        // Put it in the view model so the JSP can use it.
        // We do NOT need to fetch the ninjas separately: the Dojo model
        // contains a "ninjas" member variable we can access with dot notation.
        model.addAttribute("dojo", dojo);
        return "showDojo.jsp";
    }
}