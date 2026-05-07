class Users:
    def __init__(self, name, email, age, phone_number, balance):
        self.name = name
        self.email = email
        self.age = age
        self.phone_number = phone_number
        self.balance = balance
    
    def make_withdrow(self, amount):
        self.balance -= amount
        print(f"withdrow {amount} your balance is {self.balance}")
    
    def display_user_balance(self):
        print(f"User: {self.name}, Balance: {self.balance}")
    
    def deposit(self, amount):
        self.balance += amount
        print(f"deposit {amount} your balance is {self.balance}")

    def transfer_money(self,other_user,amount):
        self.balance -= amount
        other_user.balance += amount
        print(f"transfer {amount} to {other_user.name} your balance is {self.balance}")
    

ramez= Users("Ramez","Ramez@gmail.com", 25, 123456789, 50000)
chaker= Users("Chaker","Chaker@gmail.com", 29, 123456799, 100000)

ramez.make_withdrow(500)
ramez.transfer_money(chaker,10000)
ramez.display_user_balance()
chaker.display_user_balance()
ramez.deposit(1000)