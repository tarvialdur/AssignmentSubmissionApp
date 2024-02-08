package com.tarvialdur.AssignmentSubmissionApp.dto;

public class CommentDto {

    private Long id;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
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
