package com.axsos.burgertracker.repository;

import com.axsos.burgertracker.model.Burger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BurgerRepository extends JpaRepository<Burger, Long> {
    // JpaRepository already gives us findAll(), save(), findById(), deleteById(), etc.
    // No custom queries needed yet - "you will only need the findAll query for now".
}
