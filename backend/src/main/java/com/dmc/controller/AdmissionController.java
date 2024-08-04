package com.dmc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmc.model.Admission;
import com.dmc.service.AdmissionService;

@RestController
@RequestMapping("/api/admission")
public class AdmissionController {

    @Autowired
    private AdmissionService admissionService;

    @PostMapping
    public ResponseEntity<Admission> createAdmission(@RequestBody Admission admission) {
        Admission newAdmission = admissionService.saveAdmission(admission);
        return ResponseEntity.ok(newAdmission);
    }

    @GetMapping
    public ResponseEntity<List<Admission>> getAllAdmissions() {
        List<Admission> admissions = admissionService.getAllAdmissions();
        return ResponseEntity.ok(admissions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admission> getAdmissionById(@PathVariable Integer id) {
        Admission admission = admissionService.getAdmissionById(id);
        if (admission != null) {
            return ResponseEntity.ok(admission);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admission> updateAdmission(@PathVariable Integer id, @RequestBody Admission updatedAdmission) {
        Admission admission = admissionService.getAdmissionById(id);
        if (admission != null) {
            updatedAdmission.setId(id);
            Admission savedAdmission = admissionService.updateAdmission(updatedAdmission);
            return ResponseEntity.ok(savedAdmission);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmission(@PathVariable Integer id) {
        Admission admission = admissionService.getAdmissionById(id);
        if (admission != null) {
            admissionService.deleteAdmissionById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/verify/{id}")
    public ResponseEntity<Admission> verifyAdmission(@PathVariable Integer id){
        Admission admission = admissionService.getAdmissionById(id);
        if (admission != null) {
            admission.setVerified(true);
            Admission savedAdmission = admissionService.updateAdmission(admission);
            return ResponseEntity.ok(savedAdmission);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
