package com.axsosacademy.puzzle;

import java.util.Random;

public class Puzzle {
	Random chaker = new Random();
	
	public int[] getTenRolls(){
		int[] rolls = new int[10];
		
		for (int i=0 ; i<rolls.length; i++) {
			rolls[i] = chaker.nextInt(20) + 1;

		}
		return rolls;
	}
	
	public char getRandomLetter() {
		char[]alphabet = {
				'a','b','c', 'd' , 'e' , 'f' , 'g' , 'h' ,'i', 'j', 'k' , 'l' , 'm', 'n', 'o' , 'p' , 'q' , 'r' , 's' , 't' , 'u' , 'v' , 'w' , 'x' , 'y' , 'z'
		};
		int randomIndex = chaker.nextInt(26); // 0
		return alphabet[randomIndex]; // 'a'
	}

	public String generatePassword() {
		String password = "";
		for(int i = 0; i < 8 ; i++) {
			password += getRandomLetter();
		}
		return password;
	}
	public String[] getNewPasswordSet(int length) {
		String[] passwords = new String[length];
		for(int i=0 ; i<length ; i++) {
			passwords[i] = generatePassword();
		}
		return passwords;
	}
		
}

