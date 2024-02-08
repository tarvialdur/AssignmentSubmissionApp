package com.tarvialdur.AssignmentSubmissionApp.repository;

import com.tarvialdur.AssignmentSubmissionApp.domain.Assignment;
import com.tarvialdur.AssignmentSubmissionApp.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface CommentRepository extends JpaRepository<Comment, Long> {


    @Query("SELECT a from Comment a WHERE a.assignment.id = :assignmentId")
    Set<Comment> findByAssignmentId(Long assignmentId);
}
