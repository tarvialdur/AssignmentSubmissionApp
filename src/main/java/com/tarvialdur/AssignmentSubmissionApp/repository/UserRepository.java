package com.tarvialdur.AssignmentSubmissionApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tarvialdur.AssignmentSubmissionApp.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{

	void findByUsername(String username);

	
	
}
