package com.chaker.dojosandninjas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chaker.dojosandninjas.models.Dojo;
import com.chaker.dojosandninjas.repositories.DojoRepository;

// @Service marks this class as the "business logic" layer.
// The controller talks to the service, and the service talks to the repository.
@Service
public class DojoService {

    // The repository this service uses to reach the database
    private final DojoRepository dojoRepository;

    // Constructor injection: Spring passes the repository in for us
    public DojoService(DojoRepository dojoRepository) {
        this.dojoRepository = dojoRepository;
    }

    // Returns all dojos (used to fill the dropdown on the New Ninja page)
    public List<Dojo> allDojos() {
        return dojoRepository.findAll();
    }

    // Creates (saves) a new dojo in the database
    public Dojo createDojo(Dojo dojo) {
        return dojoRepository.save(dojo);
    }

    // Finds one dojo by its id, or returns null if it does not exist
    public Dojo findDojo(Long id) {
        Optional<Dojo> optionalDojo = dojoRepository.findById(id);
        if (optionalDojo.isPresent()) {
            return optionalDojo.get();
        } else {
            return null;
        }
    }
}