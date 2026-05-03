package com.example.HouseFlow.service;

import com.example.HouseFlow.dto.ExpenseDto;
import java.util.List;

public interface ExpenseService {
    ExpenseDto createExpense(ExpenseDto dto);
    List<ExpenseDto> getAllExpenses();
    ExpenseDto getExpenseById(Long id);
    void deleteExpense(Long id);
}