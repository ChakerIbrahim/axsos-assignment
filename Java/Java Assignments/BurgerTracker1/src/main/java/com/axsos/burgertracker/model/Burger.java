package com.axsos.burgertracker.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Burger {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Burger name must not be blankn")
	private String burgerName;
	
	@NotBlank(message = "Restaurant name must not be blank")
	private String restaurantName;
	
	@NotNull(message = "Rating must not be blank")
	@Min(value = 1, message = "Rating must be greater than 0")
	@Max(value = 4, message = "Rating must be less than 5")
	private Integer rating;
	
	@NotBlank(message = "Notes must not be blank")
	private String notes;
	
	public Burger() {
		
	}
	
	public Burger(String burgerName, String restaurantName , Integer rating, String notes) {
		this.burgerName = burgerName;
		this.restaurantName = restaurantName;
		this.rating = rating;
		this.notes = notes;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getBurgerName() {
		return burgerName;
	}
	
	public void setBurgerName(String burgerName) {
		this.burgerName = burgerName;
	}
	
	public String getRestaurantName() {
		return restaurantName;
	}
	
	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}
	
	public Integer getRating() {
		return rating;
	}
	
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	
	public String getNotes() {
		return notes;
	}
	
	public void setNotes(String notes) {
		this.notes = notes;
	}
}
