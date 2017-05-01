package com.niit.backend.dao;

import java.util.List;

import com.niit.backend.model.BlogPost;

public interface BlogDao {
   
	void saveBlogPost(BlogPost blogPost);
	List<BlogPost> getBlogPosts();
	BlogPost getBlogPostById(int id);
}
