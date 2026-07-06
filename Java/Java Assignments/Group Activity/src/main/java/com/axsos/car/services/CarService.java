package com.axsos.car.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.axsos.car.models.Car;
import com.axsos.car.repositories.CarRepository;
@Service
public class CarService {

	public final CarRepository carRepository;
// dependency injection
	public CarService(CarRepository carRepository) {
		this.carRepository = carRepository;
	}
//get all the car
	public List<Car> allCar() {
		return (List<Car>) carRepository.findAll();
	}


// Create or update burger
	public Car saveBurger(Car car) {
		return carRepository.save(car);
	}

// Find one burger by id
	public Car findBurger(Long id) {
		Optional<Car> optionalCar = carRepository.findById(id);

		if (optionalCar.isPresent()) {
			return optionalCar.get();
		} else {
			return null;
		}
	}
}
