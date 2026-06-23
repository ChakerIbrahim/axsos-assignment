package com.axosacademy.zookeeper;

public class Mammal {
	protected int energy; 
	public Mammal() {
		this.energy = 100;
}
	public void displayEnergy() {
		System.out.println("remaining energy level:" + this.energy);
	}
	
}
	
