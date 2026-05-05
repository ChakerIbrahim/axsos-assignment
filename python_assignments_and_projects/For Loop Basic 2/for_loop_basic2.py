# 1

def biggie_size(num):
    result=[]
    for i in num:
        if i > 0 :
            result.append("big")
            
        else:
            result.append([i])
    return result
print(biggie_size([-1,3,5,-5]))


# 2

def count_positives(num):
    count=0
    for i in range (0,len(num),1):
        if i>0:
            count = count+1
    num[len(num)-1]=count
    return num
print(count_positives([-1,1,1,1]))

#3

def sum_total(num):
    sum=0
    for i in range(0,len(num),1):
        sum=sum + num[i]

    return sum
print(sum_total([1,2,3,4]))

# 4
def average(num):
    sum=0
    average=0
    for i in range(0,len(num),1):
        sum = sum + num[i]
    average= sum/len(num)
    return average

print(average([1,2,3,4]))


# 5
def length(num):
    return len(num)

print(length([37,2,1,-9]))


# 6
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

# 7
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


# 8

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



# 9


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