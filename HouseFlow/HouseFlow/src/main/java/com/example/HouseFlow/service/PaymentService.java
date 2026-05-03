package com.example.HouseFlow.service;

import com.example.HouseFlow.dto.PaymentDto;
import java.util.List;

public interface PaymentService {
    PaymentDto createPayment(PaymentDto dto);
    List<PaymentDto> getAllPayments();
    PaymentDto getPaymentById(Long id);
    void deletePayment(Long id);
}