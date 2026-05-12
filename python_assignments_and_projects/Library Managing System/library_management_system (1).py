"""
Library Management System
=========================
Demonstrates two OOP pillars:
  - Inheritance
  - Polymorphism
"""

from datetime import date, timedelta


# ─────────────────────────────────────────────
# BASE CLASS (INHERITANCE)
# Defines common attributes and behaviours
# shared by every library item.
# ─────────────────────────────────────────────
class LibraryItem:
    """Base class for all library items."""

    def __init__(self, item_id, title, borrow_period_days):
        self.item_id = item_id
        self.title = title
        self.borrow_period_days = borrow_period_days
        self.is_borrowed = False
        self.borrower_name = None
        self.due_date = None

    def borrow(self, borrower_name):
        """Allow a user to borrow the item."""
        if self.is_borrowed:
            return f"'{self.title}' is already borrowed by {self.borrower_name}."
        self.is_borrowed = True
        self.borrower_name = borrower_name
        self.due_date = date.today() + timedelta(days=self.borrow_period_days)
        return f"'{self.title}' borrowed by {borrower_name}. Due: {self.due_date}"

    def return_item(self):
        """Allow a user to return the item."""
        if not self.is_borrowed:
            return f"'{self.title}' was not borrowed."
        self.is_borrowed = False
        self.borrower_name = None
        self.due_date = None
        return f"'{self.title}' returned successfully."

    def check_availability(self):
        """Check whether the item is currently available."""
        if self.is_borrowed:
            return f"'{self.title}' is NOT available. Due: {self.due_date} (borrowed by {self.borrower_name})."
        return f"'{self.title}' is available."

    def notify_if_overdue(self):
        """Notify if the item is overdue."""
        if not self.is_borrowed or self.due_date is None:
            return f"'{self.title}' is not currently borrowed."
        if date.today() > self.due_date:
            days_overdue = (date.today() - self.due_date).days
            return f"OVERDUE: '{self.title}' is {days_overdue} day(s) overdue. Borrower: {self.borrower_name}."
        return f"'{self.title}' is not overdue yet."

    # POLYMORPHISM – overridden differently in each subclass
    def calculate_late_fee(self, days_overdue):
        """Base late fee calculation (overridden by subclasses)."""
        return 0.0

    def __repr__(self):
        status = f"borrowed by {self.borrower_name}" if self.is_borrowed else "available"
        return f"{type(self).__name__}(id={self.item_id!r}, title={self.title!r}, {status})"


# ─────────────────────────────────────────────
# SUBCLASSES (INHERITANCE + POLYMORPHISM)
# Each inherits common behaviour from LibraryItem
# and overrides calculate_late_fee() differently.
# ─────────────────────────────────────────────
class Book(LibraryItem):
    """A book – 14-day borrow period, $0.25/day late fee."""

    def __init__(self, item_id, title, author, genre):
        super().__init__(item_id, title, borrow_period_days=14)
        self.author = author
        self.genre = genre

    # POLYMORPHISM – Book's own fee rule
    def calculate_late_fee(self, days_overdue):
        return round(days_overdue * 0.25, 2)

    def __repr__(self):
        return f"Book(id={self.item_id!r}, title={self.title!r}, author={self.author!r})"


class Magazine(LibraryItem):
    """A magazine – 7-day borrow period, $0.50/day late fee."""

    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title, borrow_period_days=7)
        self.issue_number = issue_number

    # POLYMORPHISM – Magazine's own fee rule
    def calculate_late_fee(self, days_overdue):
        return round(days_overdue * 0.50, 2)

    def __repr__(self):
        return f"Magazine(id={self.item_id!r}, title={self.title!r}, issue={self.issue_number})"


class DVD(LibraryItem):
    """A DVD – 3-day borrow period, $1.00 flat + $1.00/day late fee."""

    def __init__(self, item_id, title, director, duration_minutes):
        super().__init__(item_id, title, borrow_period_days=3)
        self.director = director
        self.duration_minutes = duration_minutes

    # POLYMORPHISM – DVD's own fee rule
    def calculate_late_fee(self, days_overdue):
        return round(1.00 + days_overdue * 1.00, 2)

    def __repr__(self):
        return f"DVD(id={self.item_id!r}, title={self.title!r}, director={self.director!r})"


# ─────────────────────────────────────────────
# Library – manages the collection
# ─────────────────────────────────────────────
class Library:
    """Manages a collection of LibraryItems."""

    def __init__(self, name):
        self.name = name
        self.items = {}

    def add_item(self, item):
        self.items[item.item_id] = item
        print(f"Added: {item}")

    def get_item(self, item_id):
        return self.items.get(item_id)

    def list_all(self):
        print(f"\n{'─'*55}")
        print(f"  {self.name} – {len(self.items)} item(s)")
        print(f"{'─'*55}")
        for item in self.items.values():
            print(f"  {item.check_availability()}")
        print(f"{'─'*55}\n")


# ─────────────────────────────────────────────
# Demo
# ─────────────────────────────────────────────
def main():
    print("=" * 55)
    print("   Library Management System – Demo")
    print("=" * 55)

    library = Library("City Public Library")

    # Create items using subclasses (INHERITANCE)
    book     = Book("B001", "Clean Code", "Robert C. Martin", "Software")
    magazine = Magazine("M001", "National Geographic", issue_number=245)
    dvd      = DVD("D001", "Inception", "Christopher Nolan", duration_minutes=148)

    library.add_item(book)
    library.add_item(magazine)
    library.add_item(dvd)

    library.list_all()

    # Borrow items
    print(book.borrow("Alice"))
    print(magazine.borrow("Bob"))
    print(dvd.borrow("Charlie"))
    print()

    # Try borrowing an already-borrowed item
    print(book.borrow("Dave"))
    print()

    # Check availability
    print(book.check_availability())
    print(dvd.check_availability())
    print()

    # Overdue notification
    print(book.notify_if_overdue())
    print()

    # POLYMORPHISM in action – same call, different result per type
    days_overdue = 5
    print(f"Late fees after {days_overdue} days overdue:")
    for item in [book, magazine, dvd]:
        fee = item.calculate_late_fee(days_overdue)
        print(f"  {type(item).__name__:<10} '{item.title}': ${fee:.2f}")
    print()

    # Return an item
    print(book.return_item())
    print(book.check_availability())
    print()

    library.list_all()


if __name__ == "__main__":
    main()
