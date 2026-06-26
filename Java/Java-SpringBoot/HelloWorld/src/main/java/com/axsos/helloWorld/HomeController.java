package com.axsos.helloWorld;
import org.springframework.stereotype.Controller;;
import org.springframework.ui.Model;

@Controller
public class HomeController {
	@RequestMapping("/")
	public String index(Model model) {
		model.addAttribute("futureDeveloper" , "Chaker");
		return "index.jsp";
	}
}
