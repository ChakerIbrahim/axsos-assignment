package com.axsos.prac2;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


 ...
public class newPrac {
    @RequestMapping("/greeting")
    public String index(){
      return "Hello user!";
    }
    // you can be explicit about the request as well
    @RequestMapping(value="/greeting/hello", method=RequestMethod.GET)
    public String hello(){
      return "Hello world! What route did you use to access me?";
    }
    @RequestMapping("/greeting/goodbye")
    public String world(){
      return "Goodbye world!";
    }
}


@RestController
@RequestMapping("/greeting")
public class newPrac{
	@RequestMapping("")
	public String index() {
		return "This is accesed view http://your_server/simple/root";
	}
	@RequestMapping("/hello")
	public String hello() {
		return "hello world! What route did you use to access me?";
	}
	@RequestMapping("/goodbye")
	public String world() {
		return "Goodbye world";
	}
	
}


@RestController
public class newPrac{
	@Requestmapping("/")
	public String index(@RequestParam(value="q")String searcgQuery) {
		return "You searched for:" + searchQuery;
	}
}
@RequestMapping("/")
public String index(@RequestParam(value="q" , required=false) String searchQuery) {
	return "You searched for : " + searchQuery;
}


@RestController
public class newPrac{
	@RequestMapping("/m/{courseId}/{moduleId}")
	public String showLesson(@PathVariable("courseId")
String courseId, @PathVariable("moduleId") String module Id;{
	return "Course: " + courseId + ", module:" + moduleId;
}
}


