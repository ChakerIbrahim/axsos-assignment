package com.axosacademy.zookeeper;

public class test {
	public static void main(String[]args) {
		Gorilla  jalil = new Gorilla();
		jalil.throwSomething();
		jalil.throwSomething();
		jalil.throwSomething();
		jalil.eatBanana();
		jalil.eatBanana();
		jalil.climb();
		jalil.displayEnergy();
		
		System.out.println("------------------------------------");
		
		Bat ramez = new Bat();
		ramez.atttackTown();
		ramez.atttackTown();
		ramez.atttackTown();
		ramez.eatHumans();
		ramez.eatHumans();
		ramez.fly();
		ramez.fly();
		ramez.displayEnergy();
	}
}
