package com.axsosacademy.puzzle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

public class TestPuzzleJava {	
	public static void main(String[]args) {
		Puzzle generator = new Puzzle();
		int[] randomRolls = generator.getTenRolls();
		System.out.println("Ten Rolls:" + Arrays.toString(randomRolls));
		
		char letter = generator.getRandomLetter();
			System.out.println("Random Letter:" + letter);
		
		String password = generator.generatePassword();
		System.out.println("Generated Password:"+ password);
		
		String[]passwordSet = generator.getNewPasswordSet(5);
		System.out.println("Password Set:" + Arrays.toString(passwordSet));
	}
	
}
