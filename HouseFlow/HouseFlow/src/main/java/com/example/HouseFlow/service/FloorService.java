package com.example.HouseFlow.service;

import com.example.HouseFlow.entity.Floor;
import java.util.List;

public interface FloorService {

    Floor createFloor(Floor floor);

    List<Floor> getAllFloors();

    Floor getFloorById(Long id);

    void deleteFloor(Long id);
}