package com.chaker.authentication.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.chaker.authentication.models.LoginUser;
import com.chaker.authentication.models.User;
import com.chaker.authentication.repositories.UserRepository;

// The service layer is where the bulk of business logic resides:
// additional validations and password hashing happen here.
@Service
public class UserService {

    // @Autowired lets Spring inject the repository for us,
    // so we can omit writing the constructor.
    @Autowired
    private UserRepository userRepo;

    // This method will be called from the controller
    // whenever a user submits a registration form.
    public User register(User newUser, BindingResult result) {

        // Reject if email is taken (present in database):
        // query the database for a user with this email.
        Optional<User> potentialUser = userRepo.findByEmail(newUser.getEmail());
        if (potentialUser.isPresent()) {
            // Add a custom error to the BindingResult with rejectValue
            result.rejectValue("email", "Unique", "This email is already registered!");
        }

        // Reject if password doesn't match confirmation
        if (!newUser.getPassword().equals(newUser.getConfirm())) {
            result.rejectValue("confirm", "Matches", "The Confirm Password must match Password!");
        }

        // Return null if result has errors
        // (the controller will re-render the form with the messages)
        if (result.hasErrors()) {
            return null;
        }

        // Hash and set password, save user to database.
        // BCrypt.hashpw creates a hash of the user's password,
        // and it is the HASH that we store - never the plain password.
        String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
        newUser.setPassword(hashed);
        return userRepo.save(newUser);
    }

    // This method will be called from the controller
    // whenever a user submits a login form.
    public User login(LoginUser newLoginObject, BindingResult result) {

        // Find user in the DB by email
        Optional<User> potentialUser = userRepo.findByEmail(newLoginObject.getEmail());

        // Reject if NOT present
        if (!potentialUser.isPresent()) {
            result.rejectValue("email", "Unique", "Unknown email!");
            return null;
        }

        // The user exists: take them out of the Optional
        User user = potentialUser.get();

        // Reject if BCrypt password match fails.
        // BCrypt.checkpw compares the entered password
        // with the hashed password saved in the database.
        if (!BCrypt.checkpw(newLoginObject.getPassword(), user.getPassword())) {
            result.rejectValue("password", "Matches", "Invalid Password!");
        }

        // Return null if result has errors
        if (result.hasErrors()) {
            return null;
        }

        // Otherwise, return the user object
        return user;
    }

    // Finds one user by their id (used to greet the logged-in
    // user on the success page using the id saved in session)
    public User findUserById(Long id) {
        Optional<User> potentialUser = userRepo.findById(id);
        if (potentialUser.isPresent()) {
            return potentialUser.get();
        } else {
            return null;
        }
    }
}