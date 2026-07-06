package com.axsos.burgertracker.service;

import com.axsos.burgertracker.model.Burger;
import com.axsos.burgertracker.repository.BurgerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BurgerService {

    private final BurgerRepository burgerRepository;

    @Autowired
    public BurgerService(BurgerRepository burgerRepository) {
        this.burgerRepository = burgerRepository;
    }

    // Used by the render/GET route to fill the table
    public List<Burger> findAll() {
        return burgerRepository.findAll();
    }

    // Used by the POST route to persist a new burger
    public Burger save(Burger burger) {
        return burgerRepository.save(burger);
    }
}