package com.tarvialdur.AssignmentSubmissionApp.repository;

import com.tarvialdur.AssignmentSubmissionApp.domain.Assignment;
import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Set<Assignment> findByUser(User user);


    //collecting the assignments to be displayed on screen for the code reviewer
    @Query("SELECT a FROM Assignment a WHERE  (a.status =  'submitted' and (a.codeReviewer is null or a.codeReviewer = :codeReviewer))" +
            "or a.codeReviewer = :codeReviewer ")
    Set<Assignment> findByCodeReviewer(User codeReviewer);


}
