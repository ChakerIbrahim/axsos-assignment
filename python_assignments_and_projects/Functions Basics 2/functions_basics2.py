# 1
def countdown(num):
    for i in range(num,0,-1):
        print (i)

countdown(5)

# 2

def print_and_return(num,num2):
    print (num)
    return num2

print(print_and_return(1,2))


#3
list = [1,2,3,4,5]
def first_plus_length(list):
    sum = list[0]+len(list)
    print(sum)

first_plus_length(list)

#4

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


# 5

def length_and_value(size,values):
    list=[]
    for i in range(size):
        list.append(values)
    return list
print(length_and_value(4,7))
print(length_and_value(6,2))


