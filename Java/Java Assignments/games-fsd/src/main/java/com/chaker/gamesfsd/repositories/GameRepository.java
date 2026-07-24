package com.chaker.gamesfsd.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chaker.gamesfsd.models.Game;

// Repository for the Game entity: gives us the basic CRUD methods
@Repository
public interface GameRepository extends CrudRepository<Game, Long> {

    // Returns all games in the database as a List
    List<Game> findAll();

    // Derived queries for the sortable dashboard columns:
    // "OrderBy" + field + "Asc" makes Spring add ORDER BY to the SQL.
    // When you click on Game, Genre or Release Date it will
    // sort accordingly.
    List<Game> findAllByOrderByTitleAsc();

    List<Game> findAllByOrderByGenreAsc();

    List<Game> findAllByOrderByReleaseDateAsc();
}
