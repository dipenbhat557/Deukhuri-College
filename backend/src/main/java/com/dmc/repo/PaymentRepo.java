package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Payment;

public interface PaymentRepo extends JpaRepository<Payment,Integer> {

}
