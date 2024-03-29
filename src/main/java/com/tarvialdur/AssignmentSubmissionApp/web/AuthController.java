package com.tarvialdur.AssignmentSubmissionApp.web;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.dto.AuthCredentialsRequest;
import com.tarvialdur.AssignmentSubmissionApp.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {

		try {
			Authentication authenticate = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

			User user = (User) authenticate.getPrincipal();
			user.setPassword(null);
			return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(user)).body(user);

		} catch (BadCredentialsException ex) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	// localhost:8080/api/auth/validate?token=
	@GetMapping("/validate")
	public ResponseEntity<?> validateToken (@RequestParam String token, @AuthenticationPrincipal User user){
			try{
				Boolean isTokenValid = jwtUtil.validateToken(token, user);
				return ResponseEntity.ok(isTokenValid);
			}catch(ExpiredJwtException e) {
				return ResponseEntity.ok(false);
			}



	}
}












