package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Message;

public interface MessageRepo extends JpaRepository<Message, Integer>{}