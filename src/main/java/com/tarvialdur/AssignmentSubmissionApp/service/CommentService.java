package com.tarvialdur.AssignmentSubmissionApp.service;

import com.tarvialdur.AssignmentSubmissionApp.domain.Assignment;
import com.tarvialdur.AssignmentSubmissionApp.domain.Comment;
import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.dto.CommentDto;
import com.tarvialdur.AssignmentSubmissionApp.repository.AssignmentRepository;
import com.tarvialdur.AssignmentSubmissionApp.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;
    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        Assignment assignment = assignmentRepository.getById(commentDto.getAssignmentId());

        comment.setAssignment(assignment);
        comment.setText(commentDto.getText());
        comment.setCreator(user);
        comment.setCreatedDate(LocalDateTime.now());
        return commentRepository.save(comment);

    }
}
