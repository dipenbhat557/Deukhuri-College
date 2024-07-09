package com.dmc.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.User;

public interface UserRepo extends JpaRepository<User, Integer>{
    public Optional<User> findByEmailAndPassword(String email, String password);
}