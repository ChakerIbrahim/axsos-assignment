package com.chaker.bookclub.models;

import java.util.List;

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
import jakarta.validation.constraints.Size;

// @Entity: this class maps to the "users" table in the database
@Entity
@Table(name = "users")
public class User {

    // Primary key, auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name - not blank, at least 3 characters
    @NotEmpty(message = "Name is required!")
    @Size(min = 3, max = 30, message = "Name must be between 3 and 30 characters")
    private String userName;

    // Email - valid Email format, not blank.
    // (checking that it is not already taken happens in the service,
    //  because it needs a database query)
    @NotEmpty(message = "Email is required!")
    @Email(message = "Please enter a valid email!")
    private String email;

    // Password - at least 8 characters, not blank
    @NotEmpty(message = "Password is required!")
    @Size(min = 8, max = 128, message = "Password must be between 8 and 128 characters")
    private String password;

    // @Transient: NOT stored in the database - only used temporarily
    // to compare against the password during registration
    @Transient
    @NotEmpty(message = "Confirm Password is required!")
    @Size(min = 8, max = 128, message = "Confirm Password must be between 8 and 128 characters")
    private String confirm;

    // ONE user has posted MANY books.
    // mappedBy="user" maps this list to the "user" attribute in the Book class
    // (the Book side owns the relationship / holds the foreign key user_id).
    // fetch = FetchType.LAZY: the books are only fetched when needed.
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Book> books;

    // Empty constructor required by JPA
    public User() {
    }

    // ----- getters and setters -----
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirm() {
        return confirm;
    }

    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }
}
