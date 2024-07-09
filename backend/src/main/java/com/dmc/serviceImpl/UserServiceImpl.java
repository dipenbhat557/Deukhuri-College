package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.User;
import com.dmc.payload.UserRequest;
import com.dmc.repo.UserRepo;
import com.dmc.service.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public User create(UserRequest userRequest) {

        User user = new User();

        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setName(userRequest.getName());
        try {
            if(userRequest.getFile() != null){
                user.setImg(userRequest.getFile().getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.userRepo.save(user);
    }

    @Override
    public User getByUsernameAndPassword(String username, String password) {
        return this.userRepo.findByEmailAndPassword(username, password).orElseThrow(()->new ResourceNotFoundException("Expected user is not found"));
    }

    @Override
    public User getById(int id) {
        return this.userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Expected user not found"));
    }

    @Override
    public List<User> getAll() {
        return this.userRepo.findAll();
    }

    @Override
    public User updateUser(int userId, UserRequest userRequest) {
        
        User user = this.getById(userId);

        user.setEmail(userRequest.getEmail());
        user.setName(userRequest.getName());
        user.setPassword(userRequest.getPassword());
        
        try {
            if(userRequest.getFile() != null){
                user.setImg(userRequest.getFile().getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }
        
        return this.userRepo.save(user);
    }

    @Override
    public void deleteById(int id) {
        this.userRepo.delete(this.getById(id));
    }
}