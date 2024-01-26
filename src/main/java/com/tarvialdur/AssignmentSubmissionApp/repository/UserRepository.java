package com.tarvialdur.AssignmentSubmissionApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tarvialdur.AssignmentSubmissionApp.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

}
