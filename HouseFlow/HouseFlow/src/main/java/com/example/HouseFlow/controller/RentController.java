package com.example.HouseFlow.controller;

import com.example.HouseFlow.dto.RentDto;
import com.example.HouseFlow.service.RentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rents")
public class RentController {

    private final RentService service;

    public RentController(RentService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RentDto create(@RequestBody RentDto dto) {
        return service.createRent(dto);
    }

    @GetMapping
    public List<RentDto> getAll() {
        return service.getAllRents();
    }

    @GetMapping("/{id}")
    public RentDto getById(@PathVariable Long id) {
        return service.getRentById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteRent(id);
    }
}