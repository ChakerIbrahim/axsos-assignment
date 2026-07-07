package com.axsos.burgertracker.repository;

import com.axsos.burgertracker.model.Burger;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BurgerRepository extends CrudRepository<Burger, Long> {
    // CrudRepository gives us findAll(), save(), findById(), deleteById(), etc.
    // No custom queries needed yet - "you will only need the findAll query for now".
}