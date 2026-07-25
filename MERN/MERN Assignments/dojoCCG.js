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
    constructor(name, cost, power, resilience) {
        super(name, cost);
        this.power = power;
        this.resilience = resilience;
    }
    attack(target) {
        if (target instanceof Unit) {
            target.resilience -= this.power;
            console.log(`${this.name} attacked ${target.name} for ${this.power}.`);
        } else {
            throw new Error("target must be a unit!");
        }
    }
    print() {
        console.log(`Unit: ${this.name} | Cost: ${this.cost} | Power: ${this.power} | Resilience: ${this.resilience}`);
    }
}

class Effect extends Card {
    constructor(name, cost, stat, magnitude, text) {
        super(name, cost);
        this.stat = stat;           // "resilience" or "power"
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

// ============================================
// It's Time to Duel
// ============================================

// ----- Turn 1 -----
// Make an instance of "Red Belt Ninja"   (name, cost, power, resilience)
const redBelt = new Unit("Red Belt Ninja", 3, 3, 4);

// Make an instance of "Hard Algorithm" and play it on "Red Belt Ninja"
// (name, cost, stat, magnitude, text)
const hardAlgorithm = new Effect("Hard Algorithm", 2, "resilience", 3, "increase target's resilience by 3");
hardAlgorithm.play(redBelt);   // resilience 4 + 3 = 7

// ----- Turn 2 -----
// Make an instance of "Black Belt Ninja"
const blackBelt = new Unit("Black Belt Ninja", 4, 5, 4);

// Make an instance of "Unhandled Promise Rejection" and play it on "Red Belt Ninja"
const unhandled = new Effect("Unhandled Promise Rejection", 1, "resilience", -2, "reduce target's resilience by 2");
unhandled.play(redBelt);       // resilience 7 - 2 = 5

// ----- Turn 3 -----
// Make an instance of "Pair Programming" and play it on "Red Belt Ninja"
const pairProgramming = new Effect("Pair Programming", 3, "power", 2, "increase target's power by 2");
pairProgramming.play(redBelt); // power 3 + 2 = 5

// "Red Belt Ninja" uses the attack method on "Black Belt Ninja"
redBelt.attack(blackBelt);     // Black Belt resilience 4 - 5 = -1

// ----- Final state of both units -----
redBelt.print();
blackBelt.print();