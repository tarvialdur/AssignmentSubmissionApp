package com.tarvialdur.AssignmentSubmissionApp.repository;

import com.tarvialdur.AssignmentSubmissionApp.domain.Assignment;
import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Set<Assignment> findByUser(User user);

    @Query("SELECT a FROM Assignment a WHERE a.status =  'submitted' ")
    Set<Assignment> findByCodeReviewer(User user);
}
