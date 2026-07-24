package com.chaker.gamesfsd.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chaker.gamesfsd.models.Favorite;
import com.chaker.gamesfsd.models.Game;
import com.chaker.gamesfsd.models.User;

// Repository for the Favorite middle entity
@Repository
public interface FavoriteRepository extends CrudRepository<Favorite, Long> {

    // Derived query: finds the favorite a specific user gave a
    // specific game, wrapped in an Optional. Used as a guard so
    // the same player cannot favorite the same game twice.
    Optional<Favorite> findByUserAndGame(User user, Game game);
}
