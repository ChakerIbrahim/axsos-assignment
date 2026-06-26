package com.axsos.helloWorld;
@Controller
public class FruitController {
	@RequestMapping("/")
	public String index() {
		return "index.jsp";
	}
}
