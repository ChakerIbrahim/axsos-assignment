package com.chaker.gamesfsd.models;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

// @Entity: this class maps to the "games" table in the database
@Entity
@Table(name = "games")
public class Game {

    // Primary key, auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Validation: all fields required, game name at least 2 char
    @NotEmpty(message = "Game name is required!")
    @Size(min = 2, message = "Game name should be at least 2 characters")
    private String title;

    // The genre comes from a dropdown on the form
    @NotEmpty(message = "Genre is required!")
    private String genre;

    // Validation: release date should not be in the future.
    // @PastOrPresent = today or earlier (same family as @Past,
    // but a game CAN be released today).
    // java.util.Date here so the JSP can format it as "27 sep 2023".
    @NotNull(message = "Release date is required!")
    @PastOrPresent(message = "Release date should not be in the future!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date releaseDate;

    // Validation: description should not be blank
    @NotEmpty(message = "Description should not be blank!")
    @Column(columnDefinition = "TEXT")
    private String description;

    // createdAt can never be changed after the row is inserted
    @Column(updatable = false)
    private Date createdAt;

    private Date updatedAt;

    // MANY games are created by ONE user.
    // The foreign key column "creator_id" stores who made the game -
    // Edit and Delete buttons appear for the creator of the game only.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    private User creator;

    // ONE game has many favorites (the players who like this game).
    // Each Favorite row also carries the rate they gave it.
    @OneToMany(mappedBy = "game", fetch = FetchType.LAZY)
    private List<Favorite> favorites;

    // Empty constructor required by JPA
    public Game() {
    }

    // Sets createdAt automatically before the first save
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    // Sets updatedAt automatically before every update
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    // ----- getters and setters -----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public Date getReleaseDate() { return releaseDate; }
    public void setReleaseDate(Date releaseDate) { this.releaseDate = releaseDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }

    public User getCreator() { return creator; }
    public void setCreator(User creator) { this.creator = creator; }

    public List<Favorite> getFavorites() { return favorites; }
    public void setFavorites(List<Favorite> favorites) { this.favorites = favorites; }
}
