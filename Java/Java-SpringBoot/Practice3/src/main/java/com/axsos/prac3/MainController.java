package com.axsos.prac3;

import java.util.ArrayList;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

@Controller
public class MainController {

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/programs")
    public String programs(Model model) {
        ArrayList<String> axsosPrograms = new ArrayList<String>();
        axsosPrograms.add("Web Development");
        axsosPrograms.add("Data Science");
        axsosPrograms.add("Power BI");
        model.addAttribute("programsFromMyController", axsosPrograms);
        return "index1";
    }
}

