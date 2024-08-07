package com.dmc.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Payment;

public interface PaymentService {
    public Payment create(MultipartFile file) throws IOException;
    public List<Payment> getAll();

    public Payment getById(int id);
    public void delete(int id);
}
