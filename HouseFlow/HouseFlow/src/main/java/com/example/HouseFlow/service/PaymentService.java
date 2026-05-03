package com.example.HouseFlow.service;

import com.example.HouseFlow.entity.Payment;
import java.util.List;

public interface PaymentService {

    Payment createPayment(Payment payment);

    List<Payment> getAllPayments();

    Payment getPaymentById(Long id);

    void deletePayment(Long id);
}