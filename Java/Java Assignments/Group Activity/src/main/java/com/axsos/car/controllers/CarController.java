package com.axsos.car.controllers;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.axsos.car.models.Car;
import com.axsos.car.services.CarService;

@Controller
@RequestMapping("/")
public class CarController {
	public final CarService carService;
	

    public CarController(CarService carService) {
		this.carService = carService;
	}

	@GetMapping("")
    public String index(Model model) {
        List<Car> car = carService.allCar();
        model.addAttribute("cars", car);
        return "index.jsp";
}
}
