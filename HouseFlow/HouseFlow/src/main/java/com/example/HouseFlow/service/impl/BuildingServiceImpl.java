package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.BuildingDto;
import com.example.HouseFlow.entity.Building;
import com.example.HouseFlow.exception.ResourceNotFoundException;
import com.example.HouseFlow.repository.BuildingRepository;
import com.example.HouseFlow.service.BuildingService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BuildingServiceImpl implements BuildingService {

    private final BuildingRepository repository;

    public BuildingServiceImpl(BuildingRepository repository) {
        this.repository = repository;
    }

    @Override
    public BuildingDto createBuilding(BuildingDto dto) {
        Building building = new Building();
        building.setName(dto.getName());
        building.setAddress(dto.getAddress());
        Building saved = repository.save(building);
        return new BuildingDto(saved.getId(), saved.getName(), saved.getAddress());
    }

    @Override
    public List<BuildingDto> getAllBuildings() {
        return repository.findAll().stream()
                .map(b -> new BuildingDto(b.getId(), b.getName(), b.getAddress()))
                .collect(Collectors.toList());
    }

    @Override
    public BuildingDto getBuildingById(Long id) {
        Building b = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found: " + id));
        return new BuildingDto(b.getId(), b.getName(), b.getAddress());
    }

    @Override
    public void deleteBuilding(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Building not found: " + id);
        }
        repository.deleteById(id);
    }
}