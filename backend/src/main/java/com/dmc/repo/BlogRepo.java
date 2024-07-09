package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Blog;

public interface BlogRepo extends JpaRepository<Blog, Integer>{}