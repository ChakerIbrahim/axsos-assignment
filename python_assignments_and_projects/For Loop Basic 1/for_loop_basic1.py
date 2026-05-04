# 1
for i in range(0,151,1):
    print(i)

# 2
for i in range(5,1001,5):
    print(i)

#3
for i in range(1,101,1):
    if i%5==0:
        print("Coding")
    else:
        print("Coding Dojo")

# 4
total = 0
for i in range(0, 500001, 1):
    if i % 2 != 0:
        total += i
print(total)

# 5
for i in range(2018, 0, -4):
    print(i)


# 6
lowNum=2
highNum=9
mult=3

for i in range(lowNum,highNum+1,1):
    if i % mult == 0:
        print(i)