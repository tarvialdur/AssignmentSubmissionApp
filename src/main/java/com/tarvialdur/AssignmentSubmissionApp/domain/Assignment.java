package com.tarvialdur.AssignmentSubmissionApp.domain;


import javax.persistence.*;


@Entity // will create table assignment (based on class name)
public class Assignment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String status;
	private String githubUrl;
	private String branch;
	private String codeReviewVideoUrl;

	@ManyToOne(optional = false)
	private User user;

	// TODO private User assignedTo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGithubUrl() {
		return githubUrl;
	}

	public void setGithubUrl(String githubUrl) {
		this.githubUrl = githubUrl;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getCodeRevievVideoUrl() {
		return codeReviewVideoUrl;
	}

	public void setCodeRevievVideoUrl(String codeRevievVideoUrl) {
		this.codeReviewVideoUrl = codeRevievVideoUrl;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getStatus() {return status;}

	public void setStatus(String status) {
		this.status = status;
	}
}
