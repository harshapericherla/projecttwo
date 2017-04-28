package com.niit.backend.dao;

import java.util.List;

import com.niit.backend.model.Job;

public interface JobDao {
   
	void saveJobDetails(Job job);
	List<Job> getAllJobDetails();
	Job getJobById(int id);
}
