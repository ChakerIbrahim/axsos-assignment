package com.chaker.dojosandninjas.controllers;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.chaker.dojosandninjas.models.Ninja;
import com.chaker.dojosandninjas.services.DojoService;
import com.chaker.dojosandninjas.services.NinjaService;

// Controller for everything related to ninjas
@Controller
public class NinjaController {

    // This controller needs BOTH services:
    // NinjaService to create ninjas, DojoService to fill the dropdown.
    private final NinjaService ninjaService;
    private final DojoService dojoService;

    // Constructor injection: Spring passes both services in for us
    public NinjaController(NinjaService ninjaService, DojoService dojoService) {
        this.ninjaService = ninjaService;
        this.dojoService = dojoService;
    }

    // GET /ninjas/new : shows the "New Ninja" form.
    // We pass an empty Ninja for data binding, plus ALL the dojos
    // so the dropdown can be populated with them.
    @GetMapping("/ninjas/new")
    public String newNinja(@ModelAttribute("ninja") Ninja ninja, Model model) {
        model.addAttribute("dojos", dojoService.allDojos());
        return "newNinja.jsp";
    }

    // POST /ninjas : receives the submitted form and creates the ninja.
    // Thanks to data binding, the dojo chosen in the dropdown (its id)
    // is automatically converted and attached to the ninja object,
    // which assigns the foreign key dojo_id.
    @PostMapping("/ninjas")
    public String createNinja(@Valid @ModelAttribute("ninja") Ninja ninja,
                              BindingResult result, Model model) {
        // If the form has errors, re-render it (and refill the dropdown!)
        if (result.hasErrors()) {
            model.addAttribute("dojos", dojoService.allDojos());
            return "newNinja.jsp";
        }
        // Save the ninja: it already has the dojo attached!
        ninjaService.createNinja(ninja);
        // Redirect to the dojo page of the dojo this ninja joined
        return "redirect:/dojos/" + ninja.getDojo().getId();
    }
}