# 1 Countdown - Create a function that accepts a number as an input. Return a new list that counts down by one, from the number (as the 0th element) down to 0 (as the last element).
def countdown(num):
    for i in range(num,0,-1):
        print (i)

countdown(5)

# 2 Print and Return - Create a function that will receive a list with two numbers. Print the first value and return the second.

def print_and_return(num,num2):
    print (num)
    return num2

print(print_and_return(1,2))


#3 First Plus Length - Create a function that accepts a list and returns the sum of the first value in the list plus the list's length.

list = [1,2,3,4,5]
def first_plus_length(list):
    sum = list[0]+len(list)
    print(sum)

first_plus_length(list)

#4 Values Greater than Second - Write a function that accepts a list and creates a new list containing only the values from the original list that are greater than its 2nd value. Print how many values this is and then return the new list. If the list has less than 2 elements, have the function return False

# 4. Values Greater than Second
def values_greater_than_second(lst):
    if len(lst) < 2:
        return False
    
    second = lst[1]
    result = []

    for num in range(len(lst)):
        if lst[num] > second:
            result.append(lst[num])

    print(len(result))
    return result
print(values_greater_than_second([5,7,98,54,7,2,5,1,0]))


# 5 This Length, That Value - Write a function that accepts two integers as parameters: size and value. The function should create and return a list whose length is equal to the given size, and whose values are all the given value.

def length_and_value(size,values):
    list=[]
    for i in range(size):
        list.append(values)
    return list
print(length_and_value(4,7))
print(length_and_value(6,2))


