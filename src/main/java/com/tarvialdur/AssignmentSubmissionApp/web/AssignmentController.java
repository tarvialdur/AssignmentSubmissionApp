package com.tarvialdur.AssignmentSubmissionApp.web;

import com.tarvialdur.AssignmentSubmissionApp.domain.Assignment;
import com.tarvialdur.AssignmentSubmissionApp.domain.User;
import com.tarvialdur.AssignmentSubmissionApp.dto.AssignmentResponseDto;
import com.tarvialdur.AssignmentSubmissionApp.enums.AuthorityEnum;
import com.tarvialdur.AssignmentSubmissionApp.service.AssignmentService;
import com.tarvialdur.AssignmentSubmissionApp.service.UserService;
import com.tarvialdur.AssignmentSubmissionApp.util.AuthorityUtil;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user){
            Assignment newAssignment = assignmentService.save(user);
            return  ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments (@AuthenticationPrincipal User user){
            Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
            return ResponseEntity.ok(assignmentsByUser);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user){
        Optional<Assignment> assignmentOptional = assignmentService.findById(assignmentId);
        AssignmentResponseDto response = new AssignmentResponseDto(assignmentOptional.orElse(new Assignment()));
        return ResponseEntity.ok(response);
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId,
                                                                                  @RequestBody Assignment assignment,
                                                                                  @AuthenticationPrincipal User user
                                                                                  ) {
        // add the code reviewer to this assignment if it was claimed

        if (assignment.getCodeReviewer() != null) {
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());

            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)) {
                assignment.setCodeReviewer(codeReviewer);
            }
        }
            Assignment updatedAssignment  = assignmentService.save(assignment);
            return ResponseEntity.ok(updatedAssignment);
    }


}
