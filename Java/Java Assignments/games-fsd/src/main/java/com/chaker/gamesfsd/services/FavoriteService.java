package com.chaker.gamesfsd.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chaker.gamesfsd.models.Favorite;
import com.chaker.gamesfsd.models.Game;
import com.chaker.gamesfsd.models.User;
import com.chaker.gamesfsd.repositories.FavoriteRepository;

// Service for the Favorite middle entity ("Add To Fav" + Rate)
@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepo;

    // Adds a game to a user's favorites with the chosen rate.
    // GUARD: if this user already favorited this game, do nothing -
    // same Optional + isPresent() pattern as the email-taken check.
    public Favorite addFavorite(User user, Game game, int rate) {

        Optional<Favorite> existing = favoriteRepo.findByUserAndGame(user, game);
        if (existing.isPresent()) {
            return existing.get();
        }

        // Build the middle row: user + game + rate, then save it.
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setGame(game);
        favorite.setRate(rate);
        return favoriteRepo.save(favorite);
    }
}
