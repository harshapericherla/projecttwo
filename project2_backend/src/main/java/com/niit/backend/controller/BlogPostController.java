package com.niit.backend.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.niit.backend.dao.BlogDao;
import com.niit.backend.model.BlogComment;
import com.niit.backend.model.BlogPost;
import com.niit.backend.model.Error;
import com.niit.backend.model.User;

@RestController
public class BlogPostController {

	@Autowired
	private BlogDao blogDao;
	
	@RequestMapping(value="/saveBlogPost",method=RequestMethod.POST)
	public ResponseEntity<?> saveBlogPost(@RequestBody BlogPost blogPost,HttpSession session){
		 
	    User user = (User)session.getAttribute("user");
	    if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
	    else{
	    	blogPost.setCreatedBy(user);
	    	blogPost.setCreatedOn(new Date());
	    	blogPost.setApproved(false);
	    	blogDao.saveBlogPost(blogPost);
	    	return new ResponseEntity<Void>(HttpStatus.OK);
	    }
		
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/list")
	public ResponseEntity<?> getBlogList(HttpSession session){
		
		User user = (User)session.getAttribute("user");
	    if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
	    else{
	    	List<BlogPost> blogPosts = null;
	    	if(user.getRole().equals("Admin")){
	    		blogPosts = blogDao.getBlogPosts(0);
	    	}
	    	else{
	    	     blogPosts = blogDao.getBlogPosts(1);
	    	}
	    	return new ResponseEntity<List<BlogPost>>(blogPosts,HttpStatus.OK);
	    }
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/get/{id}")
	public ResponseEntity<?> getBlogPostById(@PathVariable(value="id") int id,HttpSession session){
		
		User user = (User)session.getAttribute("user");
	    if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
	    else{
	    	BlogPost blogPost = blogDao.getBlogPostById(id);
	    	return new ResponseEntity<BlogPost>(blogPost,HttpStatus.OK);
	    }
	}
	
	@RequestMapping(value="/addcomment",method=RequestMethod.POST)
	public ResponseEntity<?> addBlogComment(@RequestBody BlogComment blogComment,HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
		blogComment.setCommentedBy(user);
		blogComment.setCommentedOn(new Date());
		blogDao.addBlogComment(blogComment);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/getblogcomments/{blogPostId}",method=RequestMethod.GET)
	public ResponseEntity<?> blogComments(@PathVariable int blogPostId,HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
		List<BlogComment> blogComments = blogDao.getBlogComments(blogPostId);
		System.out.println(blogComments);
		return new ResponseEntity<List<BlogComment>>(blogComments,HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateapproval",method=RequestMethod.PUT)
	public ResponseEntity<?> updateApproval(@RequestBody BlogPost blogPost,HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
		blogDao.update(blogPost);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
