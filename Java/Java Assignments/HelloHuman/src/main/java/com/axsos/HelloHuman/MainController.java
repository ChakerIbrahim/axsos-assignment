package com.axsos.HelloHuman;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
	@RequestMapping("/greeting")
	public String greetingMessage() {
		@RequestParam(@RequestParam)
		return "Hello human";
	}
}
