package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.BuildingDto;
import com.example.HouseFlow.entity.Building;
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

        BuildingDto response = new BuildingDto();
        response.setName(saved.getName());
        response.setAddress(saved.getAddress());

        return response;
    }

    @Override
    public List<BuildingDto> getAllBuildings() {
        return repository.findAll().stream().map(b -> {
            BuildingDto dto = new BuildingDto();
            dto.setName(b.getName());
            dto.setAddress(b.getAddress());
            return dto;
        }).collect(Collectors.toList());
    }
}