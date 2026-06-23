package com.axosacademy.zookeeper;

public class Bat extends Mammal {
	public Bat () {
		energy = 300;
	}
	public void fly() {
		energy -= 50;
		System.out.println("The Bat is now airborne");
	}
	public void eatHumans() {
		energy += 25;
		System.out.println("The Bat is Satisfied after eating Humans");
	}
	public void atttackTown() {
		energy -= 100;
		System.out.println("The Bat Has Attacked the Town and it is Satisfied");
	}
}
 