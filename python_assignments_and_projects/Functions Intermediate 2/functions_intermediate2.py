x = [ [5,2,3], [10,8,9] ] 
students = [
    {'first_name':  'Michael', 'last_name' : 'Jordan'},
    {'first_name' : 'John', 'last_name' : 'Rosales'}
]
sports_directory = {
    'basketball' : ['Kobe', 'Jordan', 'James', 'Curry'],
    'soccer' : ['Messi', 'Ronaldo', 'Rooney']
}
z = [ {'x': 10, 'y': 20} ]

x[1][0]=15
students[0]['last_name'] = 'Bryant'
sports_directory['soccer'][0] = 'Andres'

z[0]['y'] = 30

def iterateDictionary(some_list):
    for dictionary in some_list:
        line = ""
        for key, value in dictionary.items():
            line += key + " - " + value + ", "
        print(line.rstrip(", "))

students = [
    {'first_name':  'Michael', 'last_name' : 'Jordan'},
    {'first_name' : 'John', 'last_name' : 'Rosales'},
    {'first_name' : 'Mark', 'last_name' : 'Guillen'},
    {'first_name' : 'KB', 'last_name' : 'Tonel'}
]

iterateDictionary(students)



def iterateDictionary2(key_name, some_list):
    for dictionary in some_list:
        print(dictionary[key_name])

students = [
    {'first_name':  'Michael', 'last_name' : 'Jordan'},
    {'first_name' : 'John', 'last_name' : 'Rosales'},
    {'first_name' : 'Mark', 'last_name' : 'Guillen'},
    {'first_name' : 'KB', 'last_name' : 'Tonel'}
]

iterateDictionary2('first_name', students)
print("---")
iterateDictionary2('last_name', students)


def printInfo(some_dict):
    for key, value in some_dict.items():
        print(len(value), key.upper())
        for item in value:
            print(item)
        print()  

dojo = {
    'locations': ['San Jose', 'Seattle', 'Dallas', 'Chicago', 'Tulsa', 'DC', 'Burbank'],
    'instructors': ['Michael', 'Amy', 'Eduardo', 'Josh', 'Graham', 'Patrick', 'Minh', 'Devon']
}

printInfo(dojo)