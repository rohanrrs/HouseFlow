package com.example.HouseFlow.service;

import com.example.HouseFlow.dto.FloorDto;
import java.util.List;

public interface FloorService {
    FloorDto createFloor(FloorDto dto);
    List<FloorDto> getAllFloors();
    FloorDto getFloorById(Long id);
    void deleteFloor(Long id);
}