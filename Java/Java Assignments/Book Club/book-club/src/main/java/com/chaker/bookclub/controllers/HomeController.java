package com.chaker.bookclub.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.chaker.bookclub.models.LoginUser;
import com.chaker.bookclub.models.User;
import com.chaker.bookclub.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

// Controller for login, registration and logout
// (same structure as the Login and Registration assignment)
@Controller
public class HomeController {

    @Autowired
    private UserService userServ;

    // GET / : the login and registration page
    @GetMapping("/")
    public String index(Model model, HttpSession session) {

        // If the user is already logged in, send them straight
        // to the Books page instead of showing the forms again
        if (session.getAttribute("userId") != null) {
            return "redirect:/books";
        }

        // Bind empty User and LoginUser objects to the JSP
        // to capture the form input
        model.addAttribute("newUser", new User());
        model.addAttribute("newLogin", new LoginUser());
        return "index.jsp";
    }

    // POST /register : handles the registration form
    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("newUser") User newUser,
            BindingResult result, Model model, HttpSession session) {

        // Extra validations (email taken, confirm matches) + creation
        // happen in the service; errors land in the same BindingResult
        User user = userServ.register(newUser, result);

        if (result.hasErrors()) {
            // Be sure to send in the empty LoginUser before
            // re-rendering the page
            model.addAttribute("newLogin", new LoginUser());
            return "index.jsp";
        }

        // No errors! Store their ID from the DB in session (log them in),
        // then: logged-in users should be redirected to the Books page
        session.setAttribute("userId", user.getId());
        return "redirect:/books";
    }

    // POST /login : handles the login form
    @PostMapping("/login")
    public String login(@Valid @ModelAttribute("newLogin") LoginUser newLogin,
            BindingResult result, Model model, HttpSession session) {

        // The service checks the email exists + BCrypt password match
        User user = userServ.login(newLogin, result);

        if (result.hasErrors()) {
            // Be sure to send in the empty User before re-rendering
            model.addAttribute("newUser", new User());
            return "index.jsp";
        }

        // No errors! Log them in and send them to the Books page
        session.setAttribute("userId", user.getId());
        return "redirect:/books";
    }

    // GET /logout : terminate the session and go back to login page
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
}
