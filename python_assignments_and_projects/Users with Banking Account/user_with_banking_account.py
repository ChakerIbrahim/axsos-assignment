class BankAccount:
    def __init__(self):
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount


class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.account = BankAccount()  # Association with BankAccount

    def make_deposit(self, amount):
        self.account.deposit(amount)  # delegate to BankAccount

    def make_withdrawal(self, amount):
        self.account.withdraw(amount)  # delegate to BankAccount

    def display_user_balance(self):
        print(f"{self.username}'s balance: ${self.account.balance}")


# --- Testing ---
user1 = User("Alice", "alice@email.com", "pass123")

user1.make_deposit(500)
user1.make_withdrawal(200)
user1.display_user_balance()  # Alice's balance: $300