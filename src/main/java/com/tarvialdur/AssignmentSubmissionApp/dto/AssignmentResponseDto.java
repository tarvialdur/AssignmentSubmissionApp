package com.tarvialdur.AssignmentSubmissionApp.dto;

import com.tarvialdur.AssignmentSubmissionApp.domain.Assignment;
import com.tarvialdur.AssignmentSubmissionApp.enums.AssignmentEnum;
import com.tarvialdur.AssignmentSubmissionApp.enums.AssignmentStatusEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponseDto {

    private Assignment assignment;
    private final AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private final AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public AssignmentEnum[] getAssignmentEnums() {
        return assignmentEnums;
    }

    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }
}
