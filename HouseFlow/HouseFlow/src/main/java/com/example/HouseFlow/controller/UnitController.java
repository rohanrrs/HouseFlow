package com.example.HouseFlow.controller;

import com.example.HouseFlow.dto.UnitDto;
import com.example.HouseFlow.service.UnitService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/units")
public class UnitController {

    private final UnitService service;

    public UnitController(UnitService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UnitDto create(@RequestBody UnitDto dto) {
        return service.createUnit(dto);
    }

    @GetMapping
    public List<UnitDto> getAll() {
        return service.getAllUnits();
    }

    @GetMapping("/{id}")
    public UnitDto getById(@PathVariable Long id) {
        return service.getUnitById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteUnit(id);
    }
}