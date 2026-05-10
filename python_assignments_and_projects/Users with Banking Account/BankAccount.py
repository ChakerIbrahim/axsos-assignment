class BankAccount:
    def __init__(self,name,balance,int_rate):
        self.name = name
        self.balance = balance
        self.interest = int_rate
# deposit(self, amount) - increases the account balance by the given amount

    def deposit(self,amount):
        self.balance += amount
        return self
    
    # withdraw(self, amount) - decreases the account balance by the given amount if there are sufficient

    def withdraw(self,amount):
        if self.balance >= amount:
            self.balance -= amount
            return self
        else:
            print('Insuficient Funds: Charging a $5 fee')
            self.balance -= 5
            return self
# display_account_info(self) - print to the console: eg. "Balance: $100"

    def display_account_info(self):
        print(f"Name:{self.name}  BALANCE :{self.balance}")
        return self
    def yield_interest(self):
        self.balance += self.balance * self.interest
        return self

chaker= BankAccount("Chaker",500,0.05)
jalil= BankAccount("Jalil",10000, 0.20)
aws = BankAccount("AWS",2,0.2)

chaker.deposit(5000).deposit(1000).deposit(50000).withdraw(15000).yield_interest().display_account_info()
jalil.deposit(7000).deposit(9000).withdraw(100).withdraw(100).withdraw(100).withdraw(100).yield_interest().display_account_info()
aws.withdraw(5).display_account_info()

    

