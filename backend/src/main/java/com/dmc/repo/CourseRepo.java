package com.dmc.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Course;
import com.dmc.model.Program;

public interface CourseRepo extends JpaRepository<Course, Integer>{
    public List<Course> findByProgram(Program program);
}