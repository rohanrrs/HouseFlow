package com.example.HouseFlow.controller;

import com.example.HouseFlow.dto.BuildingDto;
import com.example.HouseFlow.service.BuildingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {

    private final BuildingService service;

    public BuildingController(BuildingService service) {
        this.service = service;
    }

    @PostMapping
    public BuildingDto create(@RequestBody BuildingDto dto) {
        return service.createBuilding(dto);
    }

    @GetMapping
    public List<BuildingDto> getAll() {
        return service.getAllBuildings();
    }
}