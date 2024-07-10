package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Syllabus;
import com.dmc.payload.SyllabusRequest;

public interface SyllabusService{
    public Syllabus create(SyllabusRequest req, MultipartFile file);

    public List<Syllabus> getAll();

    public Syllabus getById(int syllabusId);

    public Syllabus updateById(int syllabusId, SyllabusRequest req, MultipartFile file);

    public void deleteById(int syllabusId);
}