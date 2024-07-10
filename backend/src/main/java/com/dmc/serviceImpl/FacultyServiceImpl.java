package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Faculty;
import com.dmc.payload.FacultyRequest;
import com.dmc.repo.FacultyRepo;
import com.dmc.service.FacultyService;

@Service
public class FacultyServiceImpl implements FacultyService{

    @Autowired
    private FacultyRepo facultyRepo;

    @Override
    public Faculty create(FacultyRequest req, MultipartFile file) {
        Faculty faculty = new Faculty();

        faculty.setName(req.getName());
        faculty.setDesignation(req.getDesignation());
        faculty.setCategory(req.getCategory());

        try {
            if(file != null){
                faculty.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.facultyRepo.save(faculty);
    }

    @Override
    public List<Faculty> getAll() {
        return this.facultyRepo.findAll();
    }

    @Override
    public Faculty getById(int facultyId) {
        return this.facultyRepo.findById(facultyId).orElseThrow(()->new ResourceNotFoundException("Faculty not found"));
    }

    @Override
    public Faculty updateById(int facultyId, FacultyRequest req, MultipartFile file) {
        Faculty faculty = getById(facultyId);
        faculty.setName(req.getName());
        faculty.setDesignation(req.getDesignation());
        faculty.setCategory(req.getCategory());

        try {
            if(file != null){
                faculty.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.facultyRepo.save(faculty);
    }

    @Override
    public void deleteById(int facultyId) {
        this.facultyRepo.delete(getById(facultyId));
    }
}