package com.axsos.prac4;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController{
	
	@RequestMapping("/")
	public String index() {
		return "index.jsp";
	}
}

@RequestMapping("/login")
public String login(
		@RequestParam(value="email") String email,
			@RequestParam(value="password") String password) {
	
		return "results.jsp;
}
		)

@RequestMapping(value="login", method=RequestMethod.POST)
public String login(
		@RequestParam(value="email") String email,
		@RequestParam(value="password") String password) {
	return "redirect:dashboard";
}
		)

@RequestMapping(value="/processPayment", method=RequestMethod.POST)
public String processPayment(
		@RequestParam(value="creditCardNumber") Integer creditCardNumber,
		@RequestParam(value=expDate) Date expDate
		@RequestParam(value="productID") Integer productID {
		
			
		System.out.printf("Charging credit, timestamp:%s", new Date());
		
		return "redirect:/confirm";
		}
		)

@RequestMapping("/confirm")
public String confirmationPage(Model model) {
	
	
	return "confirmation.jsp";
}
//public String index(HttpSession session) {
//		if(session.getAttribute("count") == null) {
//        session.setAttribute("count", 0);
//        
//        
//    }
//		else {
//			
//		}
//		
//		
//		return "index.jsp";
//}
