package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.RentDto;
import com.example.HouseFlow.entity.PaymentStatus;
import com.example.HouseFlow.entity.Rent;
import com.example.HouseFlow.entity.Unit;
import com.example.HouseFlow.exception.ResourceNotFoundException;
import com.example.HouseFlow.repository.RentRepository;
import com.example.HouseFlow.repository.UnitRepository;
import com.example.HouseFlow.service.RentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentServiceImpl implements RentService {

    private final RentRepository rentRepo;
    private final UnitRepository unitRepo;

    public RentServiceImpl(RentRepository rentRepo, UnitRepository unitRepo) {
        this.rentRepo = rentRepo;
        this.unitRepo = unitRepo;
    }

    @Override
    public RentDto createRent(RentDto dto) {
        Unit unit = unitRepo.findById(dto.getUnitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found: " + dto.getUnitId()));
        Rent rent = new Rent();
        rent.setMonth(dto.getMonth());
        rent.setYear(dto.getYear());
        rent.setBaseRent(dto.getBaseRent());
        rent.setElectricity(dto.getElectricity());
        rent.setWater(dto.getWater());
        rent.setServiceCharge(dto.getServiceCharge());
        rent.setTotalAmount(dto.getTotalAmount());
        rent.setStatus(PaymentStatus.valueOf(dto.getStatus()));
        rent.setUnit(unit);
        return toDto(rentRepo.save(rent));
    }

    @Override
    public List<RentDto> getAllRents() {
        return rentRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public RentDto getRentById(Long id) {
        Rent rent = rentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rent not found: " + id));
        return toDto(rent);
    }

    @Override
    public void deleteRent(Long id) {
        if (!rentRepo.existsById(id)) {
            throw new ResourceNotFoundException("Rent not found: " + id);
        }
        rentRepo.deleteById(id);
    }

    private RentDto toDto(Rent r) {
        return new RentDto(r.getId(), r.getMonth(), r.getYear(),
                r.getBaseRent(), r.getElectricity(), r.getWater(), r.getServiceCharge(),
                r.getTotalAmount(), r.getStatus().name(), r.getUnit().getId());
    }
}