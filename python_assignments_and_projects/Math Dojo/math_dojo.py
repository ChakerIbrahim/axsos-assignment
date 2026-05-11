class MathDojo:
    def __init__(self):
        self.result = 0

    def add(self, num, *nums):
        self.result += num
        for n in nums:
            self.result += n
        return self  # enables method chaining

    def subtract(self, num, *nums):
        self.result -= num
        for n in nums:
            self.result -= n
        return self  # enables method chaining


# --- Create instance ---
md = MathDojo()

# --- Test chaining ---
x = md.add(2).add(2, 5, 1).subtract(3, 2).result
print(x)  # should print 5

# --- Test add (3 different argument counts) ---
md2 = MathDojo()
md2.add(10)
print(md2.result)       # 10

md2.add(5, 3)
print(md2.result)       # 18

md2.add(1, 2, 3, 4)
print(md2.result)       # 28

# --- Test subtract (3 different argument counts) ---
md3 = MathDojo()
md3.subtract(5)
print(md3.result)       # -5

md3.subtract(2, 3)
print(md3.result)       # -10

md3.subtract(1, 1, 1, 1)
print(md3.result)       # -14