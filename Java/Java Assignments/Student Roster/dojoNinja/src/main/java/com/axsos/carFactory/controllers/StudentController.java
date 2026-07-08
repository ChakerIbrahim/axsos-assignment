package com.axsos.carFactory.controllers;

import com.axsos.carFactory.models.Student;
import com.axsos.carFactory.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @RequestMapping("")

    public String showStudent(Model model, @ModelAttribute("students") Student student) {
        model.addAttribute("students", studentService.FindAllStudents());

        return "createStudent";
    }

    @PostMapping("/new")
    public String createStudent(Model model, @Valid @ModelAttribute("students") Student student, BindingResult result) {
        if(result.hasErrors()){
            return "createStudent";
        }
        StudentService.createStudent(student);
        return "redirect:/ninja";
    }
}
