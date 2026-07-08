package com.axsos.savetravels.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.axsos.savetravels.models.Expense;
import com.axsos.savetravels.services.ExpenseService;



@Controller
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    /* =========================================================
       PART 1 — READ all + CREATE
       ========================================================= */

    // Dashboard: table of all expenses + "Add an expense" form
    @GetMapping("/expenses")
    public String index(@ModelAttribute("expense") Expense expense, Model model) {
        List<Expense> expenses = expenseService.allExpenses();
        model.addAttribute("expenses", expenses);
        return "index";
    }

    // Process the "Add an expense" form
    @PostMapping("/expenses")
    public String create(@Valid @ModelAttribute("expense") Expense expense,
                         BindingResult result,
                         Model model) {
        if (result.hasErrors()) {
            // Re-render the same page with the table + error messages
            model.addAttribute("expenses", expenseService.allExpenses());
            return "index";
        }
        expenseService.createExpense(expense);
        return "redirect:/expenses";
    }

    /* =========================================================
       PART 2 — EDIT / UPDATE
       ========================================================= */

    // Render edit form pre-filled with the expense's current data
    @GetMapping("/expenses/edit/{id}")
    public String edit(@PathVariable("id") Long id, Model model) {
        Expense expense = expenseService.findExpense(id);
        if (expense == null) {
            return "redirect:/expenses";
        }
        model.addAttribute("expense", expense);
        return "edit";
    }

    // Process the edit form (RESTful PUT via hidden _method field)
    @PutMapping("/expenses/{id}")
    public String update(@PathVariable("id") Long id,
                         @Valid @ModelAttribute("expense") Expense expense,
                         BindingResult result) {
        if (result.hasErrors()) {
            // Redisplay the edit page with validation messages
            return "edit";
        }
        expenseService.updateExpense(expense);
        return "redirect:/expenses";
    }

    /* =========================================================
       PART 3 — SHOW one + DELETE
       ========================================================= */

    // Show details of a single expense
    @GetMapping("/expenses/{id}")
    public String show(@PathVariable("id") Long id, Model model) {
        Expense expense = expenseService.findExpense(id);
        if (expense == null) {
            return "redirect:/expenses";
        }
        model.addAttribute("expense", expense);
        return "show";
    }

    // RESTful delete (DELETE via hidden _method field)
    @DeleteMapping("/expenses/{id}")
    public String destroy(@PathVariable("id") Long id) {
        expenseService.deleteExpense(id);
        return "redirect:/expenses";
    }
}
