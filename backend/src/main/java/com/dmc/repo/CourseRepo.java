package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Course;

public interface CourseRepo extends JpaRepository<Course, Integer>{}