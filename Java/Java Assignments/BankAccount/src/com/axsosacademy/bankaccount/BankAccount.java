package com.axsosacademy.bankaccount;

public class BankAccount {
    // MEMBER VARIABLES
    private double checkingBalance;
    private double savingsBalance;

    private static int accounts;
    private static double totalMoney; // refers to the sum of all bank account checking and savings balances

    // CONSTRUCTOR
    // Be sure to increment the number of accounts
    public BankAccount() {
    	accounts ++;
    }
    
    // GETTERS
    // for checking, savings, accounts, and totalMoney
    public double getCheckingBalance() {
    	return checkingBalance;
    }
    public double getSavingsBalance() {
    	return savingsBalance;
    }
    public double getAccounts() {
    	return accounts;
    }
    public double getTotalMoney() {
    	return totalMoney;
    }
    // METHODS
    // deposit
    // - users should be able to deposit money into their checking or savings account
    public void deposit(double amount ,  String chooseAccount)  {
    	if(chooseAccount.equals("saving")) {
    		savingsBalance+=amount;
    	}
    	else if(chooseAccount.equals("checking")) {
    		checkingBalance+=amount;
    	}
    	totalMoney+=amount;
    }
    // withdraw 
    // - users should be able to withdraw money from their checking or savings account
    // - do not allow them to withdraw money if there are insufficient funds
    // - all deposits and withdrawals should affect totalMoney
    
    public void withdraw(double amount, String chooseAccount) {
    	if(chooseAccount.equals("saving")) {
    		if (amount>savingsBalance) {
    			System.out.println("Insuficient Funds Amigo");
    			return;
    		}
    		else {
    			savingsBalance -= amount;
    		}
    	}
    		else if(chooseAccount.equals("checking")) {
    			if(amount>checkingBalance) {
    				System.out.println("Insuficient Funds Amigo");
    				return;
    			}else {
    				checkingBalance -= amount;
    		}
    	}
    }
    
    // getBalance
    // - display total balance for checking and savings of a particular bank account
    	public void getBalance() {
    		String displayChecking = String.format("This is Your Account Balance for Checking Account   %.2f  %n" ,checkingBalance);
    		System.out.println(displayChecking);
    		System.out.printf("This is Your Account Balance for saving Account  %.2f%n" ,savingsBalance);
    		System.out.printf("This is Your total Accounts Balance  %.2f%n" ,savingsBalance+checkingBalance);
    		
    
    
    
    }
}
