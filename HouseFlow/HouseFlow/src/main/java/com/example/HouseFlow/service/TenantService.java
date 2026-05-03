package com.example.HouseFlow.service;

import com.example.HouseFlow.entity.Tenant;
import java.util.List;

public interface TenantService {

    Tenant createTenant(Tenant tenant);

    List<Tenant> getAllTenants();

    Tenant getTenantById(Long id);

    void deleteTenant(Long id);
}