package com.example.HouseFlow.controller;

import com.example.HouseFlow.dto.ExpenseDto;
import com.example.HouseFlow.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExpenseDto create(@RequestBody ExpenseDto dto) {
        return service.createExpense(dto);
    }

    @GetMapping
    public List<ExpenseDto> getAll() {
        return service.getAllExpenses();
    }

    @GetMapping("/{id}")
    public ExpenseDto getById(@PathVariable Long id) {
        return service.getExpenseById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteExpense(id);
    }
}