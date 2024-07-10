package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Faculty;
import com.dmc.payload.FacultyRequest;

public interface FacultyService{
    public Faculty create(FacultyRequest req, MultipartFile file);

    public List<Faculty> getAll();


    public Faculty getById(int facultyId);

    public Faculty updateById(int facultyId, FacultyRequest req, MultipartFile file);

    public void deleteById(int facultyId);
}