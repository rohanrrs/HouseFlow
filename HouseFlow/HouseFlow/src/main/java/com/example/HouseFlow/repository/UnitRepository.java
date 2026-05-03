package com.example.HouseFlow.repository;

import com.example.HouseFlow.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnitRepository extends JpaRepository<Unit, Long> {

    List<Unit> findByFloorId(Long floorId);

    // REMOVE this line (no status field)
    // List<Unit> findByStatus(String status);
}