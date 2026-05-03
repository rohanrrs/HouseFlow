package com.example.HouseFlow.repository;

import com.example.HouseFlow.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByBuildingId(Long buildingId);
}