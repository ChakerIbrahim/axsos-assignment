package com.axsos.studentrostar.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

// NOTICE: this model lacks the @Entity annotation!
// It does NOT represent a table in our database.
// It is only used temporarily to validate form input upon user login.
// Once the form input is validated and authenticated - or fails to be -
// the LoginUser instance is discarded.
public class LoginUser {

    // Only email and password fields, which are all a user
    // needs in order to log into our application
    @NotEmpty(message = "Email is required!")
    @Email(message = "Please enter a valid email!")
    private String email;

    @NotEmpty(message = "Password is required!")
    @Size(min = 8, max = 128, message = "Password must be between 8 and 128 characters")
    private String password;

    // Empty constructor
    public LoginUser() {
    }

    // ----- getters and setters -----
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
}