// Card is the base class. Every card has a name and a cost.
class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
    print() {
        console.log(`Card: ${this.name} | Cost: ${this.cost}`);
    }
}

// A Unit is a card that can fight. It has power and resilience.
class Unit extends Card {
    constructor(name, cost, power, resilience) {
        super(name, cost);          // let Card set name and cost
        this.power = power;
        this.resilience = resilience;
    }

    // A Unit can attack another Unit, lowering its resilience by this unit's power.
    attack(target) {
        // A Unit can only attack another Unit
        if (!(target instanceof Unit)) {
            throw new Error("a Unit can only attack another Unit");
        }
        target.resilience -= this.power;
        console.log(`${this.name} attacked ${target.name} for ${this.power}.`);
    }

    print() {
        console.log(`Unit: ${this.name} | Cost: ${this.cost} | Power: ${this.power} | Resilience: ${this.resilience}`);
    }
}

// An Effect is a card that changes a Unit's power or resilience when played.
class Effect extends Card {
    constructor(name, cost, stat, magnitude, text) {
        super(name, cost);          // let Card set name and cost
        this.stat = stat;           // which stat to change: "power" or "resilience"
        this.magnitude = magnitude; // how much: positive to increase, negative to decrease
        this.text = text;           // description shown on the card
    }

    play(target) {
        // Requirement: an Effect must be played on a target Unit
        if (!(target instanceof Unit)) {
            throw new Error("an Effect must be played on a target Unit");
        }

        // Requirement: an Effect increases or decreases the target's power OR resilience.
        // Use an if statement to choose which stat to change, then add the magnitude
        // (magnitude is positive to increase, negative to decrease).
        if (this.stat === "power") {
            target.power += this.magnitude;
        } else if (this.stat === "resilience") {
            target.resilience += this.magnitude;
        } else {
            throw new Error("an Effect can only change power or resilience");
        }

        console.log(`${this.name} changed ${target.name}'s ${this.stat} by ${this.magnitude}.`);
    }

    print() {
        console.log(`Effect: ${this.name} | Cost: ${this.cost} | ${this.text}`);
    }
}

// ============================================
// It's Time to Duel
// ============================================

// ----- Turn 1 -----
// Make a Red Belt Ninja, then play Hard Algorithm on it (+3 resilience)
const redBelt = new Unit("Red Belt Ninja", 3, 3, 4);
const hardAlgorithm = new Effect("Hard Algorithm", 2, "resilience", 3, "increase target's resilience by 3");
hardAlgorithm.play(redBelt);   // resilience 4 + 3 = 7

// ----- Turn 2 -----
// Make a Black Belt Ninja, then play Unhandled Promise Rejection on Red Belt (-2 resilience)
const blackBelt = new Unit("Black Belt Ninja", 4, 5, 4);
const unhandled = new Effect("Unhandled Promise Rejection", 1, "resilience", -2, "reduce target's resilience by 2");
unhandled.play(redBelt);       // resilience 7 - 2 = 5

// ----- Turn 3 -----
// Play Pair Programming on Red Belt (+2 power), then Red Belt attacks Black Belt
const pairProgramming = new Effect("Pair Programming", 3, "power", 2, "increase target's power by 2");
pairProgramming.play(redBelt); // power 3 + 2 = 5
redBelt.attack(blackBelt);     // Black Belt resilience 4 - 5 = -1

// ----- Final state of both units -----
redBelt.print();
blackBelt.print();