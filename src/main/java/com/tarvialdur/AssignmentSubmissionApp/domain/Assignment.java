package com.tarvialdur.AssignmentSubmissionApp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity // will create table assignment (based on class name)
public class Assignment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String githubUrl;
	private String branch;
	private String codeRevievVideoUrl;

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
		return codeRevievVideoUrl;
	}

	public void setCodeRevievVideoUrl(String codeRevievVideoUrl) {
		this.codeRevievVideoUrl = codeRevievVideoUrl;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
