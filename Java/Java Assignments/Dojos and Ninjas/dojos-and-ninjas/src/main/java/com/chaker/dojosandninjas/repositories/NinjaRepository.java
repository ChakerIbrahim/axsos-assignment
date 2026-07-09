package com.chaker.dojosandninjas.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chaker.dojosandninjas.models.Ninja;

// Repository for the Ninja entity: gives us the basic CRUD methods
@Repository
public interface NinjaRepository extends CrudRepository<Ninja, Long> {

    // Returns all ninjas in the database as a List
    List<Ninja> findAll();
}