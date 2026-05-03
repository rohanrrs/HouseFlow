package com.example.HouseFlow.repository;

import com.example.HouseFlow.entity.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TenantRepository extends JpaRepository<Tenant, Long> {

    Optional<Tenant> findByUnitId(Long unitId);

}