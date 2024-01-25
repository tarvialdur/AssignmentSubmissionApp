package com.tarvialdur.AssignmentSubmissionApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.util.CustomPasswordEncoder;

@Service
public class UserDetailServiceImpl implements UserDetailsService{

	@Autowired
	private CustomPasswordEncoder passwordEncoder;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = new User();
		user.setUsername("tarvi");
		user.setPassword(passwordEncoder.getPasswordEncoder().encode("salakala"));
		user.setId(1L);
		return user;
		
	}
}
