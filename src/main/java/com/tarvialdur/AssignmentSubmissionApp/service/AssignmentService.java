package com.tarvialdur.AssignmentSubmissionApp.service;

import com.tarvialdur.AssignmentSubmissionApp.domain.Assignment;
import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import com.tarvialdur.AssignmentSubmissionApp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setUser(user);
        return assignmentRepository.save(assignment);
    }

    public Set<Assignment> findByUser (User user){
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentId){
        return assignmentRepository.findById(assignmentId);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}
