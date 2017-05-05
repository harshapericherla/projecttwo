package com.niit.backend.dao;

import com.niit.backend.model.User;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao{
	
    @Autowired
	private SessionFactory sessionFactory;
     
	public User registerUser(User user){
    	 Session session = sessionFactory.openSession();
    	 session.save(user);
    	 session.flush();
    	 session.close();
    	 return user;
     }
	
	public User login(User user){
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("from User where username=? and password=?");
		query.setString(0, user.getUsername());
		query.setString(1, user.getPassword());
		User validUser = (User)query.uniqueResult();
		session.close();
		return validUser;
	}

	public void updateUser(User user) {
		Session session = sessionFactory.openSession();
	     System.out.println("--------------"+user.isOnline());
		session.update(user);
		session.flush();
		session.close();
	}

	public User getUser(int id) {
		Session session = sessionFactory.openSession();
		User user = (User)session.get(User.class, id);
		session.close();
		return user;
	}
}
