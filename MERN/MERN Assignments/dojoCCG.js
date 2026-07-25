class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
    print() {
        console.log(`Card: ${this.name} | Cost: ${this.cost}`);
    }
}

class Unit extends Card {
    constructor(name, cost, power, res) {
        super(name, cost);
        this.power = power;
        this.res = res;
    }
    attack(target) {
        if (target instanceof Unit) {
            target.res -= this.power;
            console.log(`${this.name} attacked ${target.name} for ${this.power}.`);
        } else {
            throw new Error("target must be a unit!");
        }
    }
    print() {
        console.log(`Unit: ${this.name} | Cost: ${this.cost} | Power: ${this.power} | Resilience: ${this.res}`);
    }
}

class Effect extends Card {
    constructor(name, cost, stat, magnitude, text) {
        super(name, cost);
        this.stat = stat;           // "res" or "power"
        this.magnitude = magnitude; // positive to raise, negative to lower
        this.text = text;           // description shown on the card
    }
    play(target) {
        if (target instanceof Unit) {
            target[this.stat] += this.magnitude;
            console.log(`${this.name} changed ${target.name}'s ${this.stat} by ${this.magnitude}.`);
        } else {
            throw new Error("target must be a Unit");
        }
    }
    print() {
        console.log(`Effect: ${this.name} | Cost: ${this.cost} | ${this.text}`);
    }
}

// name, cost, power, res
const blueEyes = new Unit("Blue Eyes Yellow Python", 8, 7, 8);
const redBelt  = new Unit("Red Belt Ninja", 3, 3, 4);
// name, cost, stat, magnitude, text
const hardAlgorithm = new Effect("Hard Algorithm", 2, "res", 3, "Increase target's resilience by 3.");

redBelt.print();
hardAlgorithm.play(redBelt);   // resilience 4 + 3 = 7  (matches the assignment example)
redBelt.print();

blueEyes.attack(redBelt);      // resilience 7 - 7 = 0
redBelt.print();