package com.axsos.mvc;


public class Book {
    private String title;
    private String author;
    private double price;

    public Book(String title, String author, double price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
}


public Circle extends Shape {
	@Override
	public void draw() {
		super.draw();
		System.out.println("Drawing a circle");
	}
}


interface Playable{
	void play();
		
	
}

class VideoGame implements Playable {
	@Override
	public void play() {
		System.out.println("playing a video game!")
	}
		
}

abstract class Employee {
	private String name;
	
	public Employee(String name) {
		this.name = name;
	}
	
	public String getName(){
		return name;
	}
	public abstract double calculatePay() ;
	
	
}
class SalariedEmplyee extends Employee{
	private double salary;
	
	public SalariedEmplyee(String name, double salary) {
		super(name);
		this.salary = salary;
	}
	@Override
	public double calculatePay() {
		return salary;
	}
}