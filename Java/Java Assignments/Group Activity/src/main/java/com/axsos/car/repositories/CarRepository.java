package com.axsos.car.repositories;



import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.axsos.car.models.Car;

@Repository
public interface CarRepository extends CrudRepository<Car, Long> {

	
}
