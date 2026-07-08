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

    public BurgerService(BurgerRepository burgerRepository) {
        this.burgerRepository = burgerRepository;
    }

    public List<Burger> findAll() {
        List<Burger> burgers = new ArrayList<>();
        for (Burger burger : burgerRepository.findAll()) {
            burgers.add(burger);
        }
        return burgers;
    }
    // NEW: used by the edit route to look up one burger by its id

    public Optional<Burger> findById(Long id) {
    	return burgerRepository.findById(id);
    }
    

    // Used by both create AND update - save() inserts if id is null,
    // updates the existing row if id is already set.
    public Burger create(Burger burger) {
        return burgerRepository.save(burger);
    }
}