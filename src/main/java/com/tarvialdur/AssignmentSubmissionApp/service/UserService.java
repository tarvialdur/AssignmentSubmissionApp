package com.tarvialdur.AssignmentSubmissionApp.service;

import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

   @Autowired
   private UserRepository userRepository;
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
