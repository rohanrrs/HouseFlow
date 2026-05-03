package com.example.HouseFlow.repository;

import com.example.HouseFlow.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FloorRepository extends JpaRepository<Floor, Long> {

    List<Floor> findByBuildingId(Long buildingId);

}