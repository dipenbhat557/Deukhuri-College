package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Faculty> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Faculty getById(int facultyId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Faculty updateById(int facultyId, FacultyRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int facultyId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}