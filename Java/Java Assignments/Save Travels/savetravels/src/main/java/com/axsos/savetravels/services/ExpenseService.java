package com.axsos.savetravels.services;

import com.axsos.savetravels.models.Expense;
import com.axsos.savetravels.repositories.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;



import java.util.List;


@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    // Constructor injection (Spring supplies the repository bean)
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // READ all expenses
    public List<Expense> allExpenses() {
        return expenseRepository.findAll();
    }

    // READ one expense by id (returns null if not found)
    public Expense findExpense(Long id) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        return optionalExpense.orElse(null);
    }

    // CREATE a new expense
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // UPDATE an existing expense
    public Expense updateExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // DELETE an expense by id
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
