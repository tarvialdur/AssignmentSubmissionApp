package com.tarvialdur.AssignmentSubmissionApp.dto;

public class CommentDto {

    private Long assignmentId;
    private String text;
    private String user;

    public Long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignment(Long assignment) {
        this.assignmentId = assignment;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "CommentDto{" +
                "assignmentId=" + assignmentId +
                ", text='" + text + '\'' +
                ", user='" + user + '\'' +
                '}';
    }
}
