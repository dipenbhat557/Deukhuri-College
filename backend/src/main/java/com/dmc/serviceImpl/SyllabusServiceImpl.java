package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
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
        Syllabus syllabus = new Syllabus();

        syllabus.setTitle(req.getTitle());
        syllabus.setProgram(req.getProgram());

        try {
            if(file != null){
                syllabus.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.syllabusRepo.save(syllabus);
    }

    @Override
    public List<Syllabus> getAll() {
        return this.syllabusRepo.findAll();
    }

    @Override
    public Syllabus getById(int syllabusId) {
        return this.syllabusRepo.findById(syllabusId).orElseThrow(()->new ResourceNotFoundException("Syllabus not found"));
    }

    @Override
    public Syllabus updateById(int syllabusId, SyllabusRequest req, MultipartFile file) {
        Syllabus syllabus = this.getById(syllabusId);

        syllabus.setTitle(req.getTitle());
        syllabus.setProgram(req.getProgram());

        try {
            if(file != null){
                syllabus.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.syllabusRepo.save(syllabus);
    }

    @Override
    public void deleteById(int syllabusId) {
        this.syllabusRepo.delete(this.getById(syllabusId));
    }
}