package com.chaker.gamesfsd.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.chaker.gamesfsd.models.LoginUser;
import com.chaker.gamesfsd.models.User;
import com.chaker.gamesfsd.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

// Controller for login, registration and logout
@Controller
public class HomeController {

    @Autowired
    private UserService userServ;

    // GET / : the login and registration page
    @GetMapping("/")
    public String index(Model model, HttpSession session) {

        // If the user is already logged in, send them to the dashboard
        if (session.getAttribute("userId") != null) {
            return "redirect:/dashboard";
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

        // Extra validations (email taken, confirm matches, 18+)
        // happen in the service; errors land in the same BindingResult
        User user = userServ.register(newUser, result);

        if (result.hasErrors()) {
            // Be sure to send in the empty LoginUser before re-rendering
            model.addAttribute("newLogin", new LoginUser());
            return "index.jsp";
        }

        // No errors! Store their ID in session (log them in)
        session.setAttribute("userId", user.getId());
        return "redirect:/dashboard";
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

        session.setAttribute("userId", user.getId());
        return "redirect:/dashboard";
    }

    // GET /logout : terminate the session and go back to login page
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
}