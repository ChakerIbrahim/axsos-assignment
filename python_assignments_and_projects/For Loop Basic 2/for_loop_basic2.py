# 1 Biggie Size - Given a list, write a function that changes all positive numbers in the list to "big"

def biggie_size(num):
    result=[]
    for i in num:
        if i > 0 :
            result.append("big")
            
        else:
            result.append([i])
    return result
print(biggie_size([-1,3,5,-5]))


# 2 Count Positives - Given a list of numbers, create a function to replace the last value with the number of positive values. (Note that zero is not considered to be a positive number).

def count_positives(num):
    count=0
    for i in range (0,len(num),1):
        if i>0:
            count = count+1
    num[len(num)-1]=count
    return num
print(count_positives([-1,1,1,1]))

#3  Sum Total - Create a function that takes a list and returns the sum of all the values in the list.

def sum_total(num):
    sum=0
    for i in range(0,len(num),1):
        sum=sum + num[i]

    return sum
print(sum_total([1,2,3,4]))

# 4 Average - Create a function that takes a list and returns the average of all the values.x
def average(num):
    sum=0
    average=0
    for i in range(0,len(num),1):
        sum = sum + num[i]
    average= sum/len(num)
    return average

print(average([1,2,3,4]))


# 5 Length - Create a function that takes a list and returns the length of the list.
def length(num):
    return len(num)

print(length([37,2,1,-9]))


# 6 Minimum - Create a function that takes a list of numbers and returns the minimum value in the list. If the list is empty, have the function return False.
def minimum(num):
    if len(num) == 0:        
        return False

    min = num[0]            
    for i in range(0, len(num), 1):
        if num[i] < min:      
            min = num[i]
    return min

print(minimum([37, 2, 1, -9]))  
print(minimum([]))              

# 7 Maximum - Create a function that takes a list and returns the maximum value in the list. If the list is empty, have the function return False.
def maximum(num):
    if len(num) == 0:        
        return False

    max = num[0]            
    for i in range(0, len(num), 1):
        if num[i] > max:      
            max = num[i]
    return max

print(maximum([37, 2, 1, -9]))  
print(maximum([]))      


# 8 Ultimate Analysis - Create a function that takes a list and returns a dictionary that has the sumTotal, average, minimum, maximum and length of the list.

def ultimate_analysis(num):
    if not num:
        return False
    
    sumTotal = 0
    minimum = num[0]
    maximum = num[0]
    length = 0

    for i in range(0, len(num), 1):
        sumTotal += num[i]          
        length += 1                

        if num[i] < minimum:      
            minimum = num[i]
        if num[i] > maximum:        
            maximum = num[i]

    average = sumTotal / length    

    return {
        'sumTotal': sumTotal,
        'average': average,
        'minimum': minimum,
        'maximum': maximum,
        'length': length
    }

print(ultimate_analysis([37, 2, 1, -9]))
print(ultimate_analysis([]))      



# 9 Reverse List - Create a function that takes a list and return that list with values reversed. Do this without creating a second list. (This challenge is known to appear during basic technical interviews.)


def reverse_list(num):
    left = 0
    right = len(num) - 1

    while left < right:
        
        temp = num[left]
        num[left] = num[right]
        num[right] = temp

        left += 1   
        right -= 1  

    return num

print(reverse_list([37, 2, 1, -9]))  