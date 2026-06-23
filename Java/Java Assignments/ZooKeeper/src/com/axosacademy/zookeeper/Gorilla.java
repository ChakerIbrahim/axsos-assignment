package com.axosacademy.zookeeper;

public class Gorilla extends Mammal {
	public void throwSomething() {
		this.energy -= 5;
		System.out.println("The Gorilla has trown an object");
	}
	public void eatBanana() {
		this.energy += 10;
		System.out.println("The Gorilla is very satisfied");
	}
	public void climb() {
		this.energy -= 10;
		System.out.println("The Gorilla has climbded the tree !");
	}
}
