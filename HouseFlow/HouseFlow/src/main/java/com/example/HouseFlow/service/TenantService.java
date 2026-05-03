package com.example.HouseFlow.service;

import com.example.HouseFlow.dto.TenantDto;
import java.util.List;

public interface TenantService {
    TenantDto createTenant(TenantDto dto);
    List<TenantDto> getAllTenants();
    TenantDto getTenantById(Long id);
    void deleteTenant(Long id);
}