package com.chaker.projectmanager.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.chaker.projectmanager.models.Blogs;
import com.chaker.projectmanager.models.User;
import com.chaker.projectmanager.services.BlogService;
import com.chaker.projectmanager.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

// Controller for the dashboard and everything related to blogs
@Controller
public class BlogController {

    @Autowired
    private BlogService blogServ;

    @Autowired
    private UserService userServ;

    // GET /dashboard : "Welcome, Yasmin!" + the two tables
    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model) {

        // Guard: only logged-in users can see this page
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // The logged-in user
        Long userId = (Long) session.getAttribute("userId");
        User user = userServ.findUserById(userId);
        model.addAttribute("user", user);

        // Table 1: all the blogs the user is NOT involved in
        model.addAttribute("allBlogs", blogServ.blogsNotInvolved(user));

        // Table 2: all the blogs the user IS involved in
        model.addAttribute("yourBlogs", blogServ.blogsInvolved(user));

        return "dashboard.jsp";
    }

    // GET /blogs/new : the "Create a Blog" page
    @GetMapping("/blogs/new")
    public String newBlog(@ModelAttribute("blog") Blogs blog,
            HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        return "newblog.jsp";
    }

    // POST /blogs : receives the Create a Blog form
    @PostMapping("/blogs")
    public String createBlog(@Valid @ModelAttribute("blog") Blogs blog,
            BindingResult result, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Validations are present on create: on errors, re-render the form
        if (result.hasErrors()) {
            return "newblog.jsp";
        }

        // Allow users to create blogs (and automatically become
        // team lead): attach the logged-in user as the blog's lead
        // (fills the lead_id foreign key)
        Long userId = (Long) session.getAttribute("userId");
        blog.setLead(userServ.findUserById(userId));

        blogServ.createBlog(blog);
        return "redirect:/dashboard";
    }

    // GET /blogs/{id} : the Blog Details page
    @GetMapping("/blogs/{id}")
    public String showBlog(@PathVariable("id") Long id,
            HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        model.addAttribute("blog", blogServ.findBlog(id));

        // The JSP compares this with blog.lead.id to show the
        // delete button to the lead only
        model.addAttribute("userId", session.getAttribute("userId"));

        return "details.jsp";
    }

    // GET /blogs/{id}/join : the "Join team" action.
    // ONE-TO-MANY join: we simply point the user's "blog"
    // foreign key at this blog and save the USER.
    @GetMapping("/blogs/{id}/join")
    public String joinTeam(@PathVariable("id") Long id, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Long userId = (Long) session.getAttribute("userId");
        User user = userServ.findUserById(userId);
        Blogs blog = blogServ.findBlog(id);

        // Join = set the foreign key; save the user (id present -> UPDATE)
        user.setBlog(blog);
        userServ.updateUser(user);

        return "redirect:/dashboard";
    }

    // GET /blogs/{id}/leave : the "Leave team" action.
    @GetMapping("/blogs/{id}/leave")
    public String leaveTeam(@PathVariable("id") Long id, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Long userId = (Long) session.getAttribute("userId");
        User user = userServ.findUserById(userId);

        // Guard: only leave the team you are actually on
        // (null check FIRST, so .getId() never runs on null)
        if (user.getBlog() != null
                && user.getBlog().getId().equals(id)) {
            // Leave = set the foreign key back to null and save
            user.setBlog(null);
            userServ.updateUser(user);
        }

        return "redirect:/dashboard";
    }

    // GET /blogs/edit/{id} : the Edit Blog page,
    // pre-populated with the existing values
    @GetMapping("/blogs/edit/{id}")
    public String editBlog(@PathVariable("id") Long id,
            HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Blogs blog = blogServ.findBlog(id);

        // Guard: allow users to edit blogs THEY created -
        // anyone else typing the URL gets bounced to the dashboard
        Long userId = (Long) session.getAttribute("userId");
        if (!blog.getLead().getId().equals(userId)) {
            return "redirect:/dashboard";
        }

        // Passing the existing blog pre-populates the form
        model.addAttribute("blog", blog);
        return "editblog.jsp";
    }

    // PUT /blogs/{id} : receives the edit form.
    // Validations are present on update (same as create).
    @PutMapping("/blogs/{id}")
    public String updateBlog(@PathVariable("id") Long id,
            @Valid @ModelAttribute("blog") Blogs blog,
            BindingResult result, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // On errors, re-render the edit page (values stay populated)
        if (result.hasErrors()) {
            return "editblog.jsp";
        }

        // Fetch the ORIGINAL blog and copy the relationships across,
        // so editing never wipes the lead or the timestamp.
        // (the team members' foreign keys live on the USERS' rows,
        //  so they are untouched by this update)
        Blogs original = blogServ.findBlog(id);

        blog.setId(id);                              // keep the id -> UPDATE
        blog.setLead(original.getLead());            // keep the team lead
        blog.setCreatedAt(original.getCreatedAt());  // keep the timestamp

        blogServ.updateBlog(blog);
        return "redirect:/dashboard";
    }

    // DELETE /blogs/{id} : a user is only able to DELETE
    // blogs they created
    @DeleteMapping("/blogs/{id}")
    public String deleteBlog(@PathVariable("id") Long id, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Guard: only the lead can delete the blog
        Blogs blog = blogServ.findBlog(id);
        Long userId = (Long) session.getAttribute("userId");
        if (blog.getLead().getId().equals(userId)) {

            // Before deleting: detach every team member, otherwise their
            // blog_id foreign key would still point at this blog
            // and MySQL would refuse to delete the row.
            for (User member : blog.getTeam()) {
                member.setBlog(null);
                userServ.updateUser(member);
            }

            blogServ.deleteBlog(id);
        }

        return "redirect:/dashboard";
    }
}
