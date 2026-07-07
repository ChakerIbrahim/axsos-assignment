package com.axsos.burgertracker.service;

import com.axsos.burgertracker.model.Burger;
import com.axsos.burgertracker.repository.BurgerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BurgerService {

    private final BurgerRepository burgerRepository;

    @Autowired
    public BurgerService(BurgerRepository burgerRepository) {
        this.burgerRepository = burgerRepository;
    }

    // Used by the render/GET route to fill the table
    public List<Burger> findAll() {
        List<Burger> burgers = new ArrayList<>();
        burgerRepository.findAll().forEach(burgers::add);
        return burgers;
    }
    
    // NEW: used by the edit route to look up one burger by its id

    public Optional<Burger> findById(Long id) {
    	return burgerRepository.findById(id);
    }
    

    // Used by both create AND update - save() inserts if id is null,
    // updates the existing row if id is already set.
    public Burger save(Burger burger) {
        return burgerRepository.save(burger);
    }
}