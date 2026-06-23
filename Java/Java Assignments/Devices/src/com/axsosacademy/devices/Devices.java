package com.axsosacademy.devices;

public class Devices {
	protected int battery;
	
	public Devices() {
		this.battery = 100;
		
	
	}
	public void displayBatery() {
		System.out.println("remaining battery life:" + this.battery);
	}
	public int getDevices() {
		return battery;
	}
	public void setDevices(int b) {
		this.battery = b;
	}
}
