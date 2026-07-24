class Ninja {
  constructor(name, health) {
    ((this.name = name),
    (this.health = health),
    (this.speed = 3),
    (this.strength = 3));
  }

  sayName() {
    console.log(`The ninja name is ${ninja1.name}`);
  }

  showStats() {
    console.log(
      `The ninja name is ${ninja1.name}  The ninja Strength is ${ninja1.strength}  The ninja speed is ${ninja1.speed}  The Ninja health is ${ninja1.health}`,
    );
  }

  drinkSake() {
    this.health =+ 10;
  }
  
}
const ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
ninja1.drinkSake();
ninja1.showStats();

