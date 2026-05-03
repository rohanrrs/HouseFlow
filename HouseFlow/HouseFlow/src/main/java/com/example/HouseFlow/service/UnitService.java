package com.example.HouseFlow.service;

import com.example.HouseFlow.entity.Unit;
import java.util.List;

public interface UnitService {

    Unit createUnit(Unit unit);

    List<Unit> getAllUnits();

    Unit getUnitById(Long id);

    void deleteUnit(Long id);
}