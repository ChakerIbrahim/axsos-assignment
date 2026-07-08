package com.axsos.savetravels.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Validation: must not be blank (empty string or only whitespace)
    @NotBlank(message = "Expense name must not be blank!")
    @Size(min = 2, max = 200, message = "Expense name must be at least 2 characters.")
    private String name;

    @NotBlank(message = "Vendor must not be blank!")
    @Size(min = 2, max = 200, message = "Vendor must be at least 2 characters.")
    private String vendor;

    // Validation: required AND must be greater than 0
    @NotNull(message = "Amount must not be blank!")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0!")
    private Double amount;

    @NotBlank(message = "Description must not be blank!")
    private String description;

    @Column(updatable = false)
    private Date createdAt;
    private Date updatedAt;

    // ---------- Constructors ----------
    public Expense() {
    }

    public Expense(String name, String vendor, Double amount, String description) {
        this.name = name;
        this.vendor = vendor;
        this.amount = amount;
        this.description = description;
    }

    // ---------- Lifecycle hooks: auto-manage timestamps ----------
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    // ---------- Getters & Setters ----------
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}