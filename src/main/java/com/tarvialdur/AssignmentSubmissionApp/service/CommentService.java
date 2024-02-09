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
import java.util.Optional;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        Assignment assignment = assignmentRepository.getById(commentDto.getAssignmentId());
        comment.setId(commentDto.getId());
        comment.setAssignment(assignment);
        comment.setText(commentDto.getText());
        comment.setCreator(user);

        if(comment.getId() == null) {
            comment.setCreatedDate(LocalDateTime.now());
        }
        return commentRepository.save(comment);
    }

    //decided using set because of possible duplicates
    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        Set<Comment> comments = commentRepository.findByAssignmentId(assignmentId);
        return comments;
    }

    public void delete(Long commentId){
        commentRepository.findById(commentId);
        commentRepository.deleteById(commentId);
    }


}