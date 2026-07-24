package com.chaker.gamesfsd.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// The MIDDLE model: one row = "this user likes this game with this rate".
// We can NOT use a plain join table here, because the relationship
// carries EXTRA DATA (the rate) - so we build it out of TWO
// many-to-one relationships instead (multiple one-to-many pattern).
@Entity
@Table(name = "favorites")
public class Favorite {

    // Primary key, auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The rate the player gave the game (1..5, from the Rate dropdown)
    private int rate;

    // MANY favorites belong to ONE user (the player who liked the game)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // MANY favorites belong to ONE game (the game being liked)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    // Empty constructor required by JPA
    public Favorite() {
    }

    // ----- getters and setters -----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getRate() { return rate; }
    public void setRate(int rate) { this.rate = rate; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
}
