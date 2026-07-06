package com.axsos.car.models;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "cars")
public class Car {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotNull(message ="Car name is required")
	@Size(min = 5, max = 200,message="Car name must be between 5 and 200 characters")
	private String name;
	
	@NotNull(message ="Car color is required")
	@Min(value = 1000, message = "Minimum price is 1000")
	@Max(value = 100000, message = "Maximum price is 100k")
	private String color;
	
	@NotNull(message ="Car price is required")
	@Size(min = 1000 , max = 100000,message ="Minmum price is 1000 & Maximum price is 100k")
	
	private double price;
	
    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;
    
    public Car() {
    	
    }

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

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Car(Long id,
			@NotNull(message = "Car name is required") @Size(min = 5, max = 200, message = "Car name must be between 5 and 200 characters") String name,
			@NotNull(message = "Car color is required") @Size(min = 5, max = 200, message = "Car Color must be between 5 and 200 characters") String color,
			@NotNull(message = "Car price is required") @Size(min = 1000, max = 100000, message = "Minmum price is 1000 & Maximum price is 100k") double price) {
		super();
		this.id = id;
		this.name = name;
		this.color = color;
		this.price = price;
	}
	
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
    
	

}
