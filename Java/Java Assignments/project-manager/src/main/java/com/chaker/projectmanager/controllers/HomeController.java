package com.chaker.projectmanager.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import com.chaker.projectmanager.models.LoginUser;
import com.chaker.projectmanager.models.User;
import com.chaker.projectmanager.services.UserService;

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

    // POST /register : handles the registration form.
    // The avatar arrives as a FILE: @RequestParam grabs the
    // "avatarFile" input as a MultipartFile (the uploaded file).
    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("newUser") User newUser,
                           BindingResult result,
                           @RequestParam("avatarFile") MultipartFile avatarFile,
                           Model model, HttpSession session) {

        // NINJA BONUS: validate + save the uploaded avatar picture.
        if (avatarFile.isEmpty()) {
            // No file chosen: add a custom error like any other
            result.rejectValue("avatar", "Required", "Avatar picture is required!");
        } else {
            try {
                // The folder where uploaded pictures are stored.
                // src/main/webapp is served by the app, so anything
                // saved in webapp/uploads is reachable at /uploads/...
                File uploadDir = new File("src/main/webapp/uploads");
                uploadDir.mkdirs(); // create the folder if it doesn't exist

                // Unique filename: current time + the original name,
                // so two users uploading "me.png" don't overwrite each other
                String filename = System.currentTimeMillis() + "_"
                        + avatarFile.getOriginalFilename();

                // transferTo writes the uploaded bytes to disk
                avatarFile.transferTo(new File(uploadDir.getAbsolutePath()
                        + File.separator + filename));

                // Store the picture's PATH on the user, so pages
                // can display it with <img src="${user.avatar}">
                newUser.setAvatar("/uploads/" + filename);
            } catch (Exception e) {
                result.rejectValue("avatar", "Upload", "Could not save the avatar picture!");
            }
        }

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