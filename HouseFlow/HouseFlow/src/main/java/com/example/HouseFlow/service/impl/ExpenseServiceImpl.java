package com.example.HouseFlow.service.impl;

import com.example.HouseFlow.dto.ExpenseDto;
import com.example.HouseFlow.entity.Building;
import com.example.HouseFlow.entity.Expense;
import com.example.HouseFlow.exception.ResourceNotFoundException;
import com.example.HouseFlow.repository.BuildingRepository;
import com.example.HouseFlow.repository.ExpenseRepository;
import com.example.HouseFlow.service.ExpenseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepo;
    private final BuildingRepository buildingRepo;

    public ExpenseServiceImpl(ExpenseRepository expenseRepo, BuildingRepository buildingRepo) {
        this.expenseRepo = expenseRepo;
        this.buildingRepo = buildingRepo;
    }

    @Override
    public ExpenseDto createExpense(ExpenseDto dto) {
        Building building = buildingRepo.findById(dto.getBuildingId())
                .orElseThrow(() -> new ResourceNotFoundException("Building not found: " + dto.getBuildingId()));
        Expense expense = new Expense();
        expense.setType(dto.getType());
        expense.setAmount(dto.getAmount());
        expense.setDate(dto.getDate());
        expense.setBuilding(building);
        return toDto(expenseRepo.save(expense));
    }

    @Override
    public List<ExpenseDto> getAllExpenses() {
        return expenseRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ExpenseDto getExpenseById(Long id) {
        Expense expense = expenseRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found: " + id));
        return toDto(expense);
    }

    @Override
    public void deleteExpense(Long id) {
        if (!expenseRepo.existsById(id)) {
            throw new ResourceNotFoundException("Expense not found: " + id);
        }
        expenseRepo.deleteById(id);
    }

    private ExpenseDto toDto(Expense e) {
        return new ExpenseDto(e.getId(), e.getType(), e.getAmount(), e.getDate(), e.getBuilding().getId());
    }
}