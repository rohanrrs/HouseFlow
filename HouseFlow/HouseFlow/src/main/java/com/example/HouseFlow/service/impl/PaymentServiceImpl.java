// FIX PaymentServiceImpl.java
package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.PaymentDto;
import com.example.HouseFlow.entity.*;
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
    public PaymentDto create(PaymentDto dto) {
        Unit unit = unitRepo.findById(dto.getUnitId()).orElseThrow();
        Tenant tenant = tenantRepo.findById(dto.getTenantId()).orElseThrow();

        Payment payment = new Payment();
        payment.setAmount(dto.getAmount());
        payment.setMonth(dto.getMonth());
        payment.setStatus(PaymentStatus.valueOf(dto.getStatus()));
        payment.setUnit(unit);
        payment.setTenant(tenant);

        Payment saved = paymentRepo.save(payment);

        return new PaymentDto(
                saved.getId(),
                saved.getAmount(),
                saved.getMonth(),
                saved.getStatus().name(),
                unit.getId(),
                tenant.getId()
        );
    }

    @Override
    public List<PaymentDto> getAll() {
        return paymentRepo.findAll()
                .stream()
                .map(p -> new PaymentDto(
                        p.getId(),
                        p.getAmount(),
                        p.getMonth(),
                        p.getStatus().name(),
                        p.getUnit().getId(),
                        p.getTenant().getId()
                ))
                .collect(Collectors.toList());
    }
}