package com.example.HouseFlow.service;

import com.example.HouseFlow.dto.UnitDto;
import java.util.List;

public interface UnitService {
    UnitDto createUnit(UnitDto dto);
    List<UnitDto> getAllUnits();
    UnitDto getUnitById(Long id);
    void deleteUnit(Long id);
}