package com.tarvialdur.AssignmentSubmissionApp.util;

import com.tarvialdur.AssignmentSubmissionApp.domain.User;

import java.util.stream.Collectors;

public class AuthorityUtil {

    public static Boolean hasRole(String role, User user) {

        return user.getAuthorities()
                .stream()
                .filter(auth -> auth.getAuthority().equals(role))
                .count() > 0;
    }
}
