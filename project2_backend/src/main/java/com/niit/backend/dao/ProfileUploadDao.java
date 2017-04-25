package com.niit.backend.dao;

import com.niit.backend.model.ProfilePicture;

public interface ProfileUploadDao {
     void save(ProfilePicture profilePicture);
     ProfilePicture getProfilePic(String username);
}
