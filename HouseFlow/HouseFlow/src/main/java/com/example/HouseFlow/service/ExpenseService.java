package com.example.HouseFlow.service;

import com.example.HouseFlow.entity.Expense;
import java.util.List;

public interface ExpenseService {

    Expense createExpense(Expense expense);

    List<Expense> getAllExpenses();

    Expense getExpenseById(Long id);

    void deleteExpense(Long id);
}