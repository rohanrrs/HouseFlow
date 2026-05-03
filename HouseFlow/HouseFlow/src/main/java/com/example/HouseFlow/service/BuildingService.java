package com.example.HouseFlow.service;

import com.example.HouseFlow.dto.BuildingDto;
import java.util.List;

public interface BuildingService {
    BuildingDto createBuilding(BuildingDto dto);
    List<BuildingDto> getAllBuildings();
    BuildingDto getBuildingById(Long id);
    void deleteBuilding(Long id);
}