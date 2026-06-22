package com.axsosacademy.bankaccount;

public class BankTest {
    public static void main(String[] args){
        // Create 3 bank accounts
    	BankAccount account1 = new BankAccount();
    	BankAccount account2 = new BankAccount();
    	BankAccount account3 = new BankAccount();
    	
        // Deposit Test
        // - deposit some money into each bank account's checking or savings account and display the balance each time
        // - each deposit should increase the amount of totalMoney
    	account1.deposit(500.55, "checking");
    	account1.deposit(300.33, "saving");
    	account1.getBalance();
    	
    	account2.deposit(800.55, "checking");
    	account2.getBalance();	

    	account3.deposit(1500.55, "saving");    	account3.getBalance();	   	

        // Withdrawal Test
        // - withdraw some money from each bank account's checking or savings account and display the remaining balance
        // - each withdrawal should decrease the amount of totalMoney
    	account1.withdraw(1000, "checking");
    	account1.getBalance();
    	account2.withdraw(2000, "saving");
    	account2.getBalance();
    	account3.withdraw(5000, "saving");
    	account3.getBalance();
    	
    	
        // Static Test (print the number of bank accounts and the totalMoney)
    	System.out.println("Number of the accounts : " + account1.getAccounts());
    	System.out.println("Total money across all the accounts : " + account1.getTotalMoney());
    }
}