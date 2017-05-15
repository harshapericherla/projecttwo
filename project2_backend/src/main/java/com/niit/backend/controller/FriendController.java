package com.niit.backend.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.niit.backend.dao.FriendDao;
import com.niit.backend.dao.UserDao;
import com.niit.backend.model.Error;
import com.niit.backend.model.Friend;
import com.niit.backend.model.User;

@Controller
public class FriendController {
    
	@Autowired
	private FriendDao friendDao;
	
	@Autowired
	private UserDao userDao;
	
	@RequestMapping(value="/getallusers",method=RequestMethod.GET)
	public ResponseEntity<?> getAllUsers(HttpSession session){
		 User user = (User)session.getAttribute("user");
		    if(user == null){
		    	Error error = new Error(3,"Unauthorized user, please login");
		    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
		    }
		    else{
		    	List<User> users = friendDao.getSuggestedUsers(user);
		    	System.out.println(users);
		    	return new ResponseEntity<List<User>>(users,HttpStatus.OK);
		    }
	}
	
	@RequestMapping(value="/friendrequest/{to}",method=RequestMethod.PUT)
	public ResponseEntity<?> friendRequest(@PathVariable String to,HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
		else{
		    friendDao.friendRequest(user.getUsername(), to);
		    return new ResponseEntity<Void>(HttpStatus.OK);
		}
	}
	
	@RequestMapping(value="/pendingrequests",method=RequestMethod.GET)
	public ResponseEntity<?> pendingRequests(HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
		else{
			List<Friend> pendingRequests = friendDao.pendingRequests(user.getUsername());
		return new ResponseEntity<List<Friend>>(pendingRequests,HttpStatus.OK);
		}
	}
	
	@RequestMapping(value="/updatependingrequests/{from}/{status}",method=RequestMethod.PUT)
	public ResponseEntity<?> pendingRequests(@PathVariable String from,@PathVariable char status,HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
		else{
			friendDao.updatePendingRequests(from,user.getUsername(),status);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
	}
	
	@RequestMapping(value="/friendslist",method=RequestMethod.GET)
	public ResponseEntity<?> getAllFriends(HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null){
	    	Error error = new Error(3,"Unauthorized user, please login");
	    	return new ResponseEntity<Error>(error,HttpStatus.UNAUTHORIZED);
	    }
		else{
		    List<Friend> friends = friendDao.listOfFriends(user.getUsername());
		    return new ResponseEntity<List<Friend>>(friends,HttpStatus.OK);
	    }
	}
	
	@RequestMapping(value="/getall",method=RequestMethod.GET)
	public ResponseEntity<List<User>> getAll(){
		return new ResponseEntity<List<User>>(friendDao.allUsers(),HttpStatus.OK);
	}
}
