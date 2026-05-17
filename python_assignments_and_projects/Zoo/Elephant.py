from Animal import Animal


class Elephant(Animal) :
    def __init__(self,name,age=1,trunk_length=10):
        super().__init__(name,age)
        self.trunk_length=trunk_length
        # self.name=name
        # self.age=age
        # self.health_level=health_level
        # self.hapiness_level=hapiness_level

    def feed(self):
        self.health_level=self.health_level+15
        self.hapiness_level=self.hapiness_level+10

        return self
    def displa_info(self):
        print(f'trunk{self.trunk_length}m')
        super().displa_info()
        