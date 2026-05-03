package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.TenantDto;
import com.example.HouseFlow.entity.Tenant;
import com.example.HouseFlow.entity.Unit;
import com.example.HouseFlow.exception.ResourceNotFoundException;
import com.example.HouseFlow.repository.TenantRepository;
import com.example.HouseFlow.repository.UnitRepository;
import com.example.HouseFlow.service.TenantService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepo;
    private final UnitRepository unitRepo;

    public TenantServiceImpl(TenantRepository tenantRepo, UnitRepository unitRepo) {
        this.tenantRepo = tenantRepo;
        this.unitRepo = unitRepo;
    }

    @Override
    public TenantDto createTenant(TenantDto dto) {
        Unit unit = unitRepo.findById(dto.getUnitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found: " + dto.getUnitId()));
        Tenant tenant = new Tenant();
        tenant.setName(dto.getName());
        tenant.setPhone(dto.getPhone());
        tenant.setUnit(unit);
        return toDto(tenantRepo.save(tenant));
    }

    @Override
    public List<TenantDto> getAllTenants() {
        return tenantRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public TenantDto getTenantById(Long id) {
        Tenant tenant = tenantRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found: " + id));
        return toDto(tenant);
    }

    @Override
    public void deleteTenant(Long id) {
        if (!tenantRepo.existsById(id)) {
            throw new ResourceNotFoundException("Tenant not found: " + id);
        }
        tenantRepo.deleteById(id);
    }

    private TenantDto toDto(Tenant t) {
        return new TenantDto(t.getId(), t.getName(), t.getPhone(), t.getUnit().getId());
    }
}