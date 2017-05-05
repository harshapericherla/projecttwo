package com.niit.backend.dao;

import java.util.List;

import com.niit.backend.model.BlogComment;
import com.niit.backend.model.BlogPost;

public interface BlogDao {
   
	void saveBlogPost(BlogPost blogPost);
	List<BlogPost> getBlogPosts();
	List<BlogPost> getBlogPosts(int approved);
	BlogPost getBlogPostById(int id);
	void addBlogComment(BlogComment blogComment);
	List<BlogComment> getBlogComments(int blogPostId);
	 void update(BlogPost blogPost);
}
