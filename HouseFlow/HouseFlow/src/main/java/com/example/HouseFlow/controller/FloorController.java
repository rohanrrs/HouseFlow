package com.example.HouseFlow.controller;

import com.example.HouseFlow.dto.FloorDto;
import com.example.HouseFlow.service.FloorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/floors")
public class FloorController {

    private final FloorService service;

    public FloorController(FloorService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FloorDto create(@RequestBody FloorDto dto) {
        return service.createFloor(dto);
    }

    @GetMapping
    public List<FloorDto> getAll() {
        return service.getAllFloors();
    }

    @GetMapping("/{id}")
    public FloorDto getById(@PathVariable Long id) {
        return service.getFloorById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteFloor(id);
    }
}