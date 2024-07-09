package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.User;
import com.dmc.payload.UserRequest;

public interface UserService{

    public User create(UserRequest userRequest, MultipartFile file);

    public User getByUsernameAndPassword(String username, String password);

    public User getById(int id);

    public List<User> getAll();

    public User updateUser(int userId, UserRequest userRequest, MultipartFile file);

    public void deleteById(int id);
}