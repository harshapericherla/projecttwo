package com.niit.backend.dao;

import java.util.List;

import org.hibernate.Query;
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

	public List<BlogPost> getBlogPosts() {
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("from BlogPost");
		List<BlogPost> blogPosts = query.list();
		session.close();
		return blogPosts;
	}

	public BlogPost getBlogPostById(int id) {
		Session session = sessionFactory.openSession();
		BlogPost blogPost = (BlogPost)session.get(BlogPost.class, id);
		session.close();
		return blogPost;
	}
    
}
