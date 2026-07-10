package com.axsos.studentrostar.repositires;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.axsos.studentrostar.models.User;

// Repository for saving user data to the database.
// IMPORTANT: there is no need to create a repository for LoginUser
// since we only intend to save instances of User in the database.
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    // Finds a user by their email.
    // Returns an Optional: a container that may or may not hold a User,
    // which makes database queries safer when the object may not exist.
    Optional<User> findByEmail(String email);
}