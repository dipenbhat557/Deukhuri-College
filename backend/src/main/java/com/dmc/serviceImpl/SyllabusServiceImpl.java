package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Syllabus;
import com.dmc.payload.SyllabusRequest;
import com.dmc.repo.SyllabusRepo;
import com.dmc.service.SyllabusService;

@Service
public class SyllabusServiceImpl implements SyllabusService{

    @Autowired
    private SyllabusRepo syllabusRepo;

    @Override
    public Syllabus create(SyllabusRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Syllabus> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Syllabus getById(int syllabusId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Syllabus updateById(int syllabusId, SyllabusRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int syllabusId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}