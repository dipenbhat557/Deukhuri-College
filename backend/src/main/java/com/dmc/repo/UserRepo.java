package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.User;

public interface UserRepo extends JpaRepository<User, Integer>{}