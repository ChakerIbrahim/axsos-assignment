from Crow import Crow
from Fox import Fox
from Elephant import Elephant


class Zoo:
    def __init__(self, zoo_name):
        self.animals = []
        self.names = zoo_name
    def add_crow(self, name):
        self.animals.append(Crow(name))
    def add_elephant(self, name):
        self.animals.append(Elephant(name))
    def add_fox(self, name):
        self.animals.append(Fox(name))
    def print_all_info(self):
        print("-"*30, self.names, "-"*30)
        for animal in self.animals:
            animal.display_info()
    def feed_all(self):
        for animal in self.animals:
            animal.feed()

zoo1 = Zoo("Chaker and Aws Zoo")
zoo1.add_crow("Itachi")
zoo1.add_elephant("Barbar")
zoo1.add_fox("kyuubi")
zoo1.add_crow("Shini")
zoo1.feed_all()
zoo1.print_all_info()  


