package com.tarvialdur.AssignmentSubmissionApp.web;

import com.tarvialdur.AssignmentSubmissionApp.domain.Comment;
import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.dto.CommentDto;
import com.tarvialdur.AssignmentSubmissionApp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // return data, not views, so has to be restcontroller
@RequestMapping("/api/comments") // all endpoints in this entire comments controller will be prefixed with /api/comments
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("")
    //since it's a rest controller, typically we will be returning ResponseEntity
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user){
        Comment comment = commentService.save(commentDto, user);
        System.out.println(commentDto);
        return ResponseEntity.ok(comment);
    }
}
