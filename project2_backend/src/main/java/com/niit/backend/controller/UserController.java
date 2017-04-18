package com.niit.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.niit.backend.dao.UserDao;
import com.niit.backend.model.User;
import com.niit.backend.model.Error;


@Controller
public class UserController {
 
	@Autowired
	private UserDao userDao;
	
	@RequestMapping(value="/register",method = RequestMethod.POST)
	public ResponseEntity<?> registerUser(@RequestBody User user){
		
		try{
			user.setEnabled(true);
			user.setOnline(false);
			User savedUser = userDao.registerUser(user);
			
			return new ResponseEntity<User>(savedUser,HttpStatus.OK);
		}catch(Exception e){
			
			e.printStackTrace();
			Error error = new Error(2,"could not be inserted, cannot have null/duplicate values");
			return new ResponseEntity<Error>(error,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
