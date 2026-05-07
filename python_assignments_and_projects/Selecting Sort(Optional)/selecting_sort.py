# Write the algorithm for selection sort

def sorting(num):
    for i in range(len(num)):
        min_index = i  
        
        for j in range(i + 1, len(num)):
            if num[j] < num[min_index]:
                min_index = j  
        
        
        num[i], num[min_index] = num[min_index], num[i]
    
    return num

print(sorting([5, 2, 6, 9, 8, 7]))  