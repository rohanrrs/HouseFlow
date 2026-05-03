package com.example.HouseFlow.repository;

import com.example.HouseFlow.entity.Rent;
import com.example.HouseFlow.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentRepository extends JpaRepository<Rent, Long> {

    List<Rent> findByStatus(PaymentStatus status);

    List<Rent> findByUnitId(Long unitId);
}