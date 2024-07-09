package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Subscribed;

public interface SubscribedRepo extends JpaRepository<Subscribed, Integer>{}