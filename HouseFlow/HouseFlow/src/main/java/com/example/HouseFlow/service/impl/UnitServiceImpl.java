package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.UnitDto;
import com.example.HouseFlow.entity.Floor;
import com.example.HouseFlow.entity.Unit;
import com.example.HouseFlow.exception.ResourceNotFoundException;
import com.example.HouseFlow.repository.FloorRepository;
import com.example.HouseFlow.repository.UnitRepository;
import com.example.HouseFlow.service.UnitService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitServiceImpl implements UnitService {

    private final UnitRepository unitRepo;
    private final FloorRepository floorRepo;

    public UnitServiceImpl(UnitRepository unitRepo, FloorRepository floorRepo) {
        this.unitRepo = unitRepo;
        this.floorRepo = floorRepo;
    }

    @Override
    public UnitDto createUnit(UnitDto dto) {
        Floor floor = floorRepo.findById(dto.getFloorId())
                .orElseThrow(() -> new ResourceNotFoundException("Floor not found: " + dto.getFloorId()));
        Unit unit = new Unit();
        unit.setUnitNumber(dto.getUnitNumber());
        unit.setRent(dto.getRent());
        unit.setFloor(floor);
        return toDto(unitRepo.save(unit));
    }

    @Override
    public List<UnitDto> getAllUnits() {
        return unitRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public UnitDto getUnitById(Long id) {
        Unit unit = unitRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found: " + id));
        return toDto(unit);
    }

    @Override
    public void deleteUnit(Long id) {
        if (!unitRepo.existsById(id)) {
            throw new ResourceNotFoundException("Unit not found: " + id);
        }
        unitRepo.deleteById(id);
    }

    private UnitDto toDto(Unit u) {
        return new UnitDto(u.getId(), u.getUnitNumber(), u.getRent(), u.getFloor().getId());
    }
}