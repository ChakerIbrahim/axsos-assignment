class Ninja {
  constructor(name, health = 100) {
    this.name = name;
    this.health = health;
    this.speed = 3;
    this.strength = 3;
  }

  sayName() {
    console.log(`The ninja name is ${this.name}`);
  }

  showStats() {
    console.log(
      `Name: ${this.name}, Health: ${this.health}, Speed: ${this.speed}, Strength: ${this.strength}`
    );
  }

  drinkSake() {
    this.health += 10;
  }
}

class Sensei extends Ninja {
  constructor(name) {
    super(name);
    this.speed = 10;
    this.strength = 10;
    this.health = 200;
    this.wisdom = 10;
  }

  speakWisdom() {
    this.drinkSake();
    console.log("What one programmer can do in one month, two programmers can do in two months.");
  }
}

const superSensei = new Sensei("Master Splinter");
superSensei.sayName();
superSensei.speakWisdom();
superSensei.showStats(); // Health: 210 ✓

const ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
ninja1.drinkSake();
ninja1.showStats(); // Health: 110