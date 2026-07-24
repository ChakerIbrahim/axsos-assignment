package com.chaker.projectmanager.services;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.chaker.projectmanager.models.LoginUser;
import com.chaker.projectmanager.models.User;
import com.chaker.projectmanager.repositories.UserRepository;

// The service layer is where the bulk of business logic resides:
// additional validations and password hashing happen here.
@Service
public class UserService {

    // @Autowired lets Spring inject the repository for us,
    // so we can omit writing the constructor.
    @Autowired
    private UserRepository userRepo;

    // Called from the controller whenever a registration form is submitted
    public User register(User newUser, BindingResult result) {

        // Reject if email is taken (present in database)
        Optional<User> potentialUser = userRepo.findByEmail(newUser.getEmail());
        if (potentialUser.isPresent()) {
            result.rejectValue("email", "Unique", "This email is already registered!");
        }

        // Reject if password doesn't match confirmation
        if (!newUser.getPassword().equals(newUser.getConfirm())) {
            result.rejectValue("confirm", "Matches", "The Confirm Password must match Password!");
        }

        // NINJA BONUS: users must be at least 18 years old to register.
        // Only run the math if a date was submitted (if it's null,
        // the @NotNull annotation already added its own error).
        if (newUser.getDateOfBirth() != null) {
            int age = Period.between(newUser.getDateOfBirth(), LocalDate.now()).getYears();
            if (age < 18) {
                result.rejectValue("dateOfBirth", "Matches",
                        "You must be at least 18 years old to register!");
            }
        }

        // Return null if result has errors
        if (result.hasErrors()) {
            return null;
        }

        // Hash and set password, save user to database
        String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
        newUser.setPassword(hashed);
        return userRepo.save(newUser);
    }

    // Called from the controller whenever a login form is submitted
    public User login(LoginUser newLoginObject, BindingResult result) {

        // Find user in the DB by email
        Optional<User> potentialUser = userRepo.findByEmail(newLoginObject.getEmail());

        // Reject if NOT present
        if (!potentialUser.isPresent()) {
            result.rejectValue("email", "Unique", "Unknown email!");
            return null;
        }

        User user = potentialUser.get();

        // Reject if BCrypt password match fails
        if (!BCrypt.checkpw(newLoginObject.getPassword(), user.getPassword())) {
            result.rejectValue("password", "Matches", "Invalid Password!");
        }

        if (result.hasErrors()) {
            return null;
        }

        return user;
    }

    // Finds one user by their id (used with the id saved in session)
    public User findUserById(Long id) {
        Optional<User> potentialUser = userRepo.findById(id);
        if (potentialUser.isPresent()) {
            return potentialUser.get();
        } else {
            return null;
        }
    }

    // Saves changes on an existing user - used by Join team / Leave team,
    // which change the user's "project" foreign key.
    // (same save method: the user has an id -> UPDATE)
    public User updateUser(User user) {
        return userRepo.save(user);
    }
}