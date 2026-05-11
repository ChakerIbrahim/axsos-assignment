class Animal:
    def __init__(self,name,age):
        self.name = name
        self.age = age
        self.health_level = 100
        self.hapiness_level = 100

        
    def feed(self):
        self.health_level=self.health_level+10
        self.hapiness_level=self.hapiness_level+10
        return self
    
    def display_info(self):
        print(f'name: {self.name} age: {self.age} health: {self.health_level} hapiness: {self.hapiness_level}')