package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Statute;

public interface StatuteRepo extends JpaRepository<Statute, Integer>{}