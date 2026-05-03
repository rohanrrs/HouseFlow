package com.example.HouseFlow.repository;

import com.example.HouseFlow.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingRepository extends JpaRepository<Building, Long> {
}