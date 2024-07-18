package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmc.model.Admission;
import com.dmc.repo.AdmissionRepo;
import com.dmc.service.AdmissionService;

@Service
public class AdmissionServiceImpl implements AdmissionService {

    @Autowired
    private AdmissionRepo admissionRepo;

    public Admission saveAdmission(Admission admission) {
        return admissionRepo.save(admission);
    }

    public List<Admission> getAllAdmissions() {
        return admissionRepo.findAll();
    }

    public Admission getAdmissionById(Integer id) {
        return admissionRepo.findById(id).orElse(null);
    }

    public void deleteAdmissionById(Integer id) {
        admissionRepo.deleteById(id);
    }

    public Admission updateAdmission(Admission admission) {
        return admissionRepo.save(admission);
    }
}
