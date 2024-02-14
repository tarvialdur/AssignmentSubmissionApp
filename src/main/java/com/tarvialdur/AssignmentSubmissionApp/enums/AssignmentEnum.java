package com.tarvialdur.AssignmentSubmissionApp.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    ASSIGNMENT_1(1, "Assignment Text 1"),
    ASSIGNMENT_2(2, "Assignment Text 2"),
    ASSIGNMENT_3(3, "Assignment Text 3"),
    ASSIGNMENT_4(4, "Assignment Text 4"),
    ASSIGNMENT_5(5, "Assignment Text 5"),
    ASSIGNMENT_6(6, "Assignment Text 6"),
    ASSIGNMENT_7(7, "Assignment Text 7"),
    ASSIGNMENT_8(8,  "Assignment Text 8"),
    ASSIGNMENT_9(9, "Assignment Text 9"),
    ASSIGNMENT_10(10, "Assignment Text 10"),
    ASSIGNMENT_11(11, "Assignment Text 11"),
    ASSIGNMENT_12(12, "Assignment Text 12"),
    ASSIGNMENT_13(13, "Assignment Text 13"),
    ASSIGNMENT_14(14, "Assignment Text 14"),
    ASSIGNMENT_15(15, "Assingment Text 15");

    private final int assignmentNumber;
    private final String assignmentName;

     AssignmentEnum(int assignmentNumber, String assignmentName){
        this.assignmentNumber = assignmentNumber;
        this.assignmentName = assignmentName;
    }

    public int getAssignmentNumber() {
        return assignmentNumber;
    }

    public String getAssignmentName() {
        return assignmentName;
    }
}
