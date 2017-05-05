package com.niit.backend.dao;

import java.util.List;

import com.niit.backend.model.Friend;
import com.niit.backend.model.User;

public interface FriendDao {
    List<User> getSuggestedUsers(User user);
    public void friendRequest(String from,String to);
    public List<Friend> pendingRequests(String toUsername);
}
