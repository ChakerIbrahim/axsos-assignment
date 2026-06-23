package com.axsosacademy.devices;

public class Phone extends Devices {
	public void makeCall() {
		System.out.println("You made a call");
		this.battery -= 5;
		displayBatery();
	}
	public void playGame() {
		System.out.println("You played a game");
		this.battery -= 20;
		displayBatery();
	}
	public void charge() {
		System.out.println("You are charging!");
		this.battery += 50;
		displayBatery();
	}
	
}



