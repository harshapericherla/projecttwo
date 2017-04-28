package com.niit.backend.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.backend.model.BlogPost;

@Repository
public class BlogDaoImpl implements BlogDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public void saveBlogPost(BlogPost blogPost) {
		
		Session session = sessionFactory.openSession();
		session.save(blogPost);
		session.flush();
		session.close();
		
		
	}
    
}
