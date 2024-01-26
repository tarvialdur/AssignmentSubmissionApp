package com.tarvialdur.AssignmentSubmissionApp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityBuilder;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.tarvialdur.AssignmentSubmissionApp.filter.JwtFilter;
import com.tarvialdur.AssignmentSubmissionApp.util.CustomPasswordEncoder;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig<O> extends SecurityConfigurerAdapter<O, SecurityBuilder<O>> {

	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private CustomPasswordEncoder customPasswordEncoder;

	@Autowired
	private JwtFilter jwtFilter;

	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(customPasswordEncoder.getPasswordEncoder());
	}

	@SuppressWarnings({ "removal", "deprecation" })
	protected void configure(HttpSecurity http) throws Exception {

		http = http.csrf().disable().cors().disable();

		http = http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and();

		http = http.exceptionHandling().authenticationEntryPoint((request, response, ex) -> {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
		}).and();

		http.authorizeRequests().anyRequest().authenticated();

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	}

}

// Code from toptal.com/spring/spring-security-tutorial