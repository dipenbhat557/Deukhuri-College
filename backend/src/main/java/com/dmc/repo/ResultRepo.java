package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Result;

public interface ResultRepo extends JpaRepository<Result, Integer>{}