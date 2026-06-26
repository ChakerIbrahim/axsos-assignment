package com.axsos.routes;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class DaikichiController {
	public DaikichiController() {
		
	}
	@RequestMapping("/Daikichi")
	public String welcome() {
		return "Welcome";
	}
	@RequestMapping("/Daikichi/today")
	public String today() {
		return "Today you will find luck in all your endeavors!";
	}
	@RequestMapping("/Daikichi/tomorrow")
	public String tomorrow() {
		return "Tomorrow a new opportunity will arise , so be sure to be open to new ideas!";
}
}