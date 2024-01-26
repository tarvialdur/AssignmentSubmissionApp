package com.tarvialdur.AssignmentSubmissionApp.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.tarvialdur.AssignmentSubmissionApp.repository.UserRepository;
import com.tarvialdur.AssignmentSubmissionApp.util.JwtUtil;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private JwtUtil jwtUtil;

	// Get authorization header and validate
	// do i have an authorization bearer token?
	// if no, kick it to next one in security chain

	@Override
	protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request,
			jakarta.servlet.http.HttpServletResponse response, jakarta.servlet.FilterChain chain)
			throws jakarta.servlet.ServletException, IOException {
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (!StringUtils.hasText(header) || StringUtils.hasText(header) && !header.startsWith("Bearer ")) {
			chain.doFilter(request, response);
			return;
		}

		// Authorization -> [Bearer ], [asdfdsafkasjg98234.123r1weqf.qasdfadv]
		// splitting the token with a space and give me next one, the chiberdy jab and
		// trim in case there are any spaces between characters
		final String token = header.split(" ")[1].trim();

		// Get user identity and set it on the spring security context
		// now we should have the token and pass it to this method and username gets
		// extracted from token and findbyusername is
		// going to check the DB the username. if it finds the user and assignes it to
		// userDetails, if no, then gonne return null.
		UserDetails userDetails = userRepo.findByUsername(jwtUtil.getUsernameFromToken(token)).orElse(null);

		// Get jwt token and validate
		// nof, if userDetails is populated, with this we can validate the token
		if (!jwtUtil.validateToken(token, userDetails)) {
			chain.doFilter(request, response);
			return;
		}

		// if the username is a match then go to the password auth. it needs
		// userDetails, credentials and authorities.

		// NOTE: not sure if the null value works, tried: userDetails,
		// userDetails.getPassword(), but it could be a security problem?
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
				userDetails == null ? List.of() : userDetails.getAuthorities());

		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

		// This is where the authentication magic happens and the user is now valid!
		// This is spring securitys way to programatically validate a user and put it
		// into our security world.
		// This is a valid user and injecting it into our spring context. User has
		// access where they should have access to.
		// Login successful!
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(request, response);

	}

}
