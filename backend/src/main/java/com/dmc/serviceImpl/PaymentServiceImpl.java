package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Payment;
import com.dmc.repo.PaymentRepo;
import com.dmc.service.PaymentService;

public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;

    @Override
    public Payment create(MultipartFile file) throws IOException {
        Payment payment = new Payment();

        payment.setImg(file.getBytes());
        payment = this.paymentRepo.save(payment);

        return payment;
    }

    @Override
    public List<Payment> getAll() {
        return this.paymentRepo.findAll();
    }

    @Override
    public Payment getById(int id) {
        return this.paymentRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("The payment is not found"));
    }

    @Override
    public void delete(int id) {
        this.paymentRepo.delete(this.getById(id));
    }
    
}
