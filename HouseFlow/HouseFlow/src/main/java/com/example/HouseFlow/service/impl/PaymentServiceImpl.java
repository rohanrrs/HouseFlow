package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.PaymentDto;
import com.example.HouseFlow.entity.*;
import com.example.HouseFlow.exception.ResourceNotFoundException;
import com.example.HouseFlow.repository.*;
import com.example.HouseFlow.service.PaymentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepo;
    private final UnitRepository unitRepo;
    private final TenantRepository tenantRepo;

    public PaymentServiceImpl(PaymentRepository paymentRepo, UnitRepository unitRepo, TenantRepository tenantRepo) {
        this.paymentRepo = paymentRepo;
        this.unitRepo = unitRepo;
        this.tenantRepo = tenantRepo;
    }

    @Override
    public PaymentDto createPayment(PaymentDto dto) {
        Unit unit = unitRepo.findById(dto.getUnitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found: " + dto.getUnitId()));
        Tenant tenant = tenantRepo.findById(dto.getTenantId())
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found: " + dto.getTenantId()));

        Payment payment = new Payment();
        payment.setAmount(dto.getAmount());
        payment.setMonth(dto.getMonth());
        payment.setStatus(PaymentStatus.valueOf(dto.getStatus()));
        payment.setUnit(unit);
        payment.setTenant(tenant);

        return toDto(paymentRepo.save(payment));
    }

    @Override
    public List<PaymentDto> getAllPayments() {
        return paymentRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public PaymentDto getPaymentById(Long id) {
        Payment payment = paymentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found: " + id));
        return toDto(payment);
    }

    @Override
    public void deletePayment(Long id) {
        if (!paymentRepo.existsById(id)) {
            throw new ResourceNotFoundException("Payment not found: " + id);
        }
        paymentRepo.deleteById(id);
    }

    private PaymentDto toDto(Payment p) {
        return new PaymentDto(p.getId(), p.getAmount(), p.getMonth(),
                p.getStatus().name(), p.getUnit().getId(), p.getTenant().getId());
    }
}