from Animal import Animal


class Fox(Animal) :
    def __init__(self,name,age=1,number_of_tails=1):
        super().__init__(name,age)
        self.number_of_tails=number_of_tails
        # self.name=name
        # self.age=age
        # self.health_level=health_level
        # self.hapiness_level=hapiness_level
        
        
    def feed(self):
        self.health_level=self.health_level+20
        self.hapiness_level=self.hapiness_level+30

        return self
    def displa_info(self):
        print(f'number of tails{self.number_of_tails}')
        super().displa_info()