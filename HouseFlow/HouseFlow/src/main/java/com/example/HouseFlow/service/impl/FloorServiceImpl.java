package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.FloorDto;
import com.example.HouseFlow.entity.Building;
import com.example.HouseFlow.entity.Floor;
import com.example.HouseFlow.exception.ResourceNotFoundException;
import com.example.HouseFlow.repository.BuildingRepository;
import com.example.HouseFlow.repository.FloorRepository;
import com.example.HouseFlow.service.FloorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FloorServiceImpl implements FloorService {

    private final FloorRepository floorRepo;
    private final BuildingRepository buildingRepo;

    public FloorServiceImpl(FloorRepository floorRepo, BuildingRepository buildingRepo) {
        this.floorRepo = floorRepo;
        this.buildingRepo = buildingRepo;
    }

    @Override
    public FloorDto createFloor(FloorDto dto) {
        Building building = buildingRepo.findById(dto.getBuildingId())
                .orElseThrow(() -> new ResourceNotFoundException("Building not found: " + dto.getBuildingId()));
        Floor floor = new Floor();
        floor.setFloorNumber(dto.getFloorNumber());
        floor.setBuilding(building);
        return toDto(floorRepo.save(floor));
    }

    @Override
    public List<FloorDto> getAllFloors() {
        return floorRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public FloorDto getFloorById(Long id) {
        Floor floor = floorRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Floor not found: " + id));
        return toDto(floor);
    }

    @Override
    public void deleteFloor(Long id) {
        if (!floorRepo.existsById(id)) {
            throw new ResourceNotFoundException("Floor not found: " + id);
        }
        floorRepo.deleteById(id);
    }

    private FloorDto toDto(Floor f) {
        return new FloorDto(f.getId(), f.getFloorNumber(), f.getBuilding().getId());
    }
}