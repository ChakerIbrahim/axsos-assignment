package com.chaker.gamesfsd.models;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

// @Entity: this class maps to the "users" table in the database
@Entity
@Table(name = "users")
public class User {

    // Primary key, auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Validation 1: first name should not be blank and not less than 4 char
    @NotEmpty(message = "First name is required!")
    @Size(min = 4, max = 30, message = "First name must be at least 4 characters")
    private String firstName;

    // Validation 2: last name should not be blank and not less than 4 char
    @NotEmpty(message = "Last name is required!")
    @Size(min = 4, max = 30, message = "Last name must be at least 4 characters")
    private String lastName;

    // Validation 3: email should be valid (and unique - the unique
    // check happens in the service, because it needs a database query)
    @NotEmpty(message = "Email is required!")
    @Email(message = "Please enter a valid email!")
    private String email;

    // Validation 5: password should be at least 8 char
    @NotEmpty(message = "Password is required!")
    @Size(min = 8, max = 128, message = "Password must be at least 8 characters")
    private String password;

    // Validation 4: password and confirm password should match
    // (the matching check is in the service with rejectValue).
    // @Transient: NEVER stored in the database.
    @Transient
    @NotEmpty(message = "Confirm Password is required!")
    @Size(min = 8, max = 128, message = "Confirm Password must be at least 8 characters")
    private String confirm;

    // User should be 18 years or older:
    // @NotNull because a date is not text; @Past = must be before today;
    // the "18 years" math lives in the service (annotations can't do math).
    // @DateTimeFormat converts the date picker's text into a LocalDate.
    @NotNull(message = "Date of birth is required!")
    @Past(message = "Date of birth must be in the past!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    // NINJA BONUS: upload avatar - we store the picture's URL as text
    @NotEmpty(message = "Avatar URL is required!")
    private String avatar;

    // FIRST one-to-many: ONE user CREATES many games.
    // mappedBy="creator" maps this list to the "creator"
    // attribute in the Game class.
    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
    private List<Game> gamesCreated;

    // SECOND one-to-many: ONE user has many favorites.
    // Each Favorite row links this user to one game + a rate.
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Favorite> favorites;

    // Empty constructor required by JPA
    public User() {
    }

    // ----- getters and setters -----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirm() { return confirm; }
    public void setConfirm(String confirm) { this.confirm = confirm; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public List<Game> getGamesCreated() { return gamesCreated; }
    public void setGamesCreated(List<Game> gamesCreated) { this.gamesCreated = gamesCreated; }

    public List<Favorite> getFavorites() { return favorites; }
    public void setFavorites(List<Favorite> favorites) { this.favorites = favorites; }
}
