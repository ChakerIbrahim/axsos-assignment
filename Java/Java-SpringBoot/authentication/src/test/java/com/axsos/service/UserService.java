package com.axsos.service;

import java.util.Optional;
    
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
    
import com.authentication.models.LoginUser;
import com.authentication.models.User;
import com.authentication.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public User register(User newUser, BindindResult result) {
		return null;
	}
	public User login(LoginUser newLoginObject, BindingResult result) {
		return null;
		
	}
}

if(!newUser.getPassword().equals(newUser.getConfirm())) {
	result.rejectValue("confirm", "Matches", "The Confirm Password must match password!");
}


Optional<User> potentialUser = 
userRepo.findByEmail(newLogin.getEmail());


potentialUSer.isPresent()


String hashed = BCrypt.hashpw(newUser.getPassword(), Bcrypt.gensalt());


if(!BCryots.checkpw(newLogin.getPassword(), user.getPassword())) {
	
	result.rejectValue("password", "Matches", "Invalid Password!");
	
}
