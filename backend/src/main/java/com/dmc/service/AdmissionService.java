package com.dmc.service;

import java.util.List;

import com.dmc.model.Admission;

public interface AdmissionService{

    public Admission saveAdmission(Admission admission);

    public List<Admission> getAllAdmissions();

    public Admission getAdmissionById(Integer id);

    public void deleteAdmissionById(Integer id);

    public Admission updateAdmission(Admission admission);
}