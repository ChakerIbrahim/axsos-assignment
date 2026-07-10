package com.axsos.studentrostar.controllers;

import com.axsos.studentrostar.models.Dorm;
import com.axsos.studentrostar.models.Student;
import com.axsos.studentrostar.services.DormServices;
import com.axsos.studentrostar.services.StudentService;
import com.axsos.studentrostar.services.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/dorms")
public class DormController {
    private final DormServices dormServices;
    private final UserService userService;
    private final StudentService studentService;

    public DormController(DormServices dormServices, StudentService studentService, UserService userService){
        this.userService = userService;
        this.dormServices =dormServices;
        this.studentService = studentService;
    }

    @RequestMapping("")
    public String dashboard(Model model, HttpSession session){
        List<Dorm> dorms =  dormServices.showAllTheDorms();
        model.addAttribute("dorms",dorms);
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Grab the logged-in user's ID from session and use it to
        // fetch the user, so we can greet them by name on the page.
        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userService.findUserById(userId));


        return "dashboard";
    }

    @RequestMapping("/new")
    public String dormPage(@ModelAttribute("dorms")Dorm dorm, HttpSession session, Model model){
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Grab the logged-in user's ID from session and use it to
        // fetch the user, so we can greet them by name on the page.
        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userService.findUserById(userId));


        return "newDorm";
    }

    @PostMapping("/create")
    public String createDorm(@Valid @ModelAttribute("dorms") Dorm dorm,BindingResult result){
        if(result.hasErrors()){
            return "newDorm";
        }
        dormServices.createCallDorm(dorm);
        return "redirect:/dorms";
    }

    @RequestMapping("/{dorm_id}")
    public String dormStudents(@PathVariable("dorm_id") Long dorm_id,Model model, HttpSession session){
        Dorm dorm = dormServices.findDorm(dorm_id);
        model.addAttribute("dorm",dorm);
        model.addAttribute("allStudents",studentService.findAllStudents());
        model.addAttribute("students",new Student());
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Grab the logged-in user's ID from session and use it to
        // fetch the user, so we can greet them by name on the page.
        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userService.findUserById(userId));


        return "show";
    }

    @RequestMapping("{dorm_id}/delete")
    public String dormSectionDelete(@PathVariable("dorm_id") Long dorm_id){
        dormServices.deleteCallDorm(dorm_id);
        return "redirect:/dorms";
    }


    @PostMapping("/{dorm_id}/add")
        public String addStudentToDorm(@PathVariable("dorm_id")Long dorm_id,@ModelAttribute("students")Student student){
    studentService.assignDorm(student.getStudent_id(), dorm_id);
    return "redirect:/dorms/"+ dorm_id;
    }

}
