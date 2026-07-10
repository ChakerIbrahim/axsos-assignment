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
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;
    private  final DormServices dormServices;
    private final UserService userService;

    public StudentController(StudentService studentService,DormServices dormServices, UserService userService) {
        this.studentService = studentService;
        this.dormServices = dormServices;
        this.userService = userService;
    }

    @RequestMapping("")

    public String showStudent(@ModelAttribute("students") Student student, Model model, HttpSession session) {
        List<Dorm> dorms = dormServices.showAllTheDorms();
        model.addAttribute("dorms",dorms);
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Grab the logged-in user's ID from session and use it to
        // fetch the user, so we can greet them by name on the page.
        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userService.findUserById(userId));



        return "newStudent";
    }

    @PostMapping("/create")
    public String createStudent(Model model, @Valid @ModelAttribute("students") Student student, BindingResult result) {
        if(result.hasErrors()){
            model.addAttribute("dorms", dormServices.showAllTheDorms());
            return "newStudent";
        }
        studentService.createCallStudent(student);
        return "redirect:/dorms";
    }

    @RequestMapping("/delete/{student_id}/{dorm_id}")
    public String deleteTheStudent(@PathVariable("student_id")Long student_id,@PathVariable("dorm_id")Long dorm_id){
        studentService.deleteCallStudent(student_id);
        return "redirect:/dorms/"+dorm_id;
    }
}
