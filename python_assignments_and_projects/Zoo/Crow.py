from Animal import Animal


class Crow(Animal) :
    def __init__(self,name,age=1,special_wings=False):
        super().__init__(name,age)
        self.special_wings= special_wings
        # self.name=name
        # self.age=age
        # self.health_level=health_level
        # self.hapiness_level=hapiness_level
    
    def feed(self):
        self.health_level=self.health_level+50
        self.hapiness_level=self.hapiness_level+70

        return self
    def displa_info(self):
        print(f'wings type{self.special_wings}')
        super().displa_info()