package com.chaker.dojosandninjas.services;

import org.springframework.stereotype.Service;

import com.chaker.dojosandninjas.models.Ninja;
import com.chaker.dojosandninjas.repositories.NinjaRepository;

// Service layer for Ninja: holds the basic CRUD logic
@Service
public class NinjaService {

    // The repository this service uses to reach the database
    private final NinjaRepository ninjaRepository;

    // Constructor injection: Spring passes the repository in for us
    public NinjaService(NinjaRepository ninjaRepository) {
        this.ninjaRepository = ninjaRepository;
    }

    // Creates (saves) a new ninja in the database.
    // The ninja already has its dojo attached thanks to data binding.
    public Ninja createNinja(Ninja ninja) {
        return ninjaRepository.save(ninja);
    }
}