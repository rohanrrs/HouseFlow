package com.example.HouseFlow.controller;

import com.example.HouseFlow.dto.TenantDto;
import com.example.HouseFlow.service.TenantService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    private final TenantService service;

    public TenantController(TenantService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TenantDto create(@RequestBody TenantDto dto) {
        return service.createTenant(dto);
    }

    @GetMapping
    public List<TenantDto> getAll() {
        return service.getAllTenants();
    }

    @GetMapping("/{id}")
    public TenantDto getById(@PathVariable Long id) {
        return service.getTenantById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteTenant(id);
    }
}