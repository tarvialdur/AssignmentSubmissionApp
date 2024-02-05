package com.tarvialdur.AssignmentSubmissionApp.service;

import com.tarvialdur.AssignmentSubmissionApp.domain.Assignment;
import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import com.tarvialdur.AssignmentSubmissionApp.enums.AuthorityEnum;
import com.tarvialdur.AssignmentSubmissionApp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setUser(user);
        return assignmentRepository.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignmentByUser = assignmentRepository.findByUser(user);
        if (assignmentByUser == null) {
            return 1;
        }

        Optional<Integer> nextAssignmentNumberOpt = assignmentByUser.stream()
                .sorted((a1, a2) -> {
                    if (a1.getNumber() == null)
                        return 1;
                    if (a2.getNumber() == null)
                        return 1;
                    return a2.getNumber().compareTo(a1.getNumber());
                })
                .map(assignment -> {
                    if (assignment.getNumber() == null)
                        return 1;

                    return assignment.getNumber() + 1;
                })
                .findFirst();
        return nextAssignmentNumberOpt.orElse(1);
    }

    public Set<Assignment> findByUser(User user) {

        boolean hasCodeReviewerRole = user.getAuthorities()
                .stream()
                .filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
                .count() > 0;
        if(hasCodeReviewerRole){
            // get assignments for code reviewer
            return assignmentRepository.findByCodeReviewer(user);
        } else{
            // get assignments for the employee role
        }
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}
