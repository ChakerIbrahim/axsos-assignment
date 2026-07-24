package com.chaker.gamesfsd.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chaker.gamesfsd.models.Game;
import com.chaker.gamesfsd.repositories.GameRepository;

// Service layer for Game: CRUD + sorting logic
@Service
public class GameService {

    // @Autowired injects the repository, so we omit the constructor
    @Autowired
    private GameRepository gameRepo;

    // Returns the games list, sorted according to the clicked column.
    // "sort" arrives from the URL (?sort=title / genre / date);
    // anything else (or nothing) returns the unsorted list.
    public List<Game> allGames(String sort) {
        if ("title".equals(sort)) {
            return gameRepo.findAllByOrderByTitleAsc();
        } else if ("genre".equals(sort)) {
            return gameRepo.findAllByOrderByGenreAsc();
        } else if ("date".equals(sort)) {
            return gameRepo.findAllByOrderByReleaseDateAsc();
        } else {
            return gameRepo.findAll();
        }
    }

    // Creates (saves) a new game - the creator is already attached
    public Game createGame(Game game) {
        return gameRepo.save(game);
    }

    // Finds one game by its id, or returns null if it does not exist
    public Game findGame(Long id) {
        Optional<Game> optionalGame = gameRepo.findById(id);
        if (optionalGame.isPresent()) {
            return optionalGame.get();
        } else {
            return null;
        }
    }

    // Updates an existing game (same save method: id present -> UPDATE)
    public Game updateGame(Game game) {
        return gameRepo.save(game);
    }

    // Deletes a game by its id
    public void deleteGame(Long id) {
        gameRepo.deleteById(id);
    }
}
