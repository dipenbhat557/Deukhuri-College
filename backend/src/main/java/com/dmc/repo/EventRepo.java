package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Event;

public interface EventRepo extends JpaRepository<Event, Integer>{}