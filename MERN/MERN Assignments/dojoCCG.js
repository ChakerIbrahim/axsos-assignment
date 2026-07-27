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
    // A Unit can attack another Unit, lowering its resilience by this unit's power.
    attack(target) {
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

class Effect extends Card {
    constructor(name, cost, stat, magnitude, text) {
        super(name, cost);
        this.stat = stat;           // "power" or "resilience"
        this.magnitude = magnitude; // positive to raise, negative to lower
        this.text = text;           // description shown on the card
    }
    play(target) {
        // Requirement: an Effect requires a target, and that target must be a Unit
        if (!(target instanceof Unit)) {
            throw new Error("an Effect must be played on a target Unit");
        }
        // Requirement: an Effect can only change a Unit's power or resilience
        if (this.stat !== "power" && this.stat !== "resilience") {
            throw new Error("an Effect can only change power or resilience");
        }
        // Increase or decrease that stat (magnitude is + to raise, - to lower)
        target[this.stat] += this.magnitude;
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
const redBelt = new Unit("Red Belt Ninja", 3, 3, 4);
const hardAlgorithm = new Effect("Hard Algorithm", 2, "resilience", 3, "increase target's resilience by 3");
hardAlgorithm.play(redBelt);   // resilience 4 + 3 = 7

// ----- Turn 2 -----
const blackBelt = new Unit("Black Belt Ninja", 4, 5, 4);
const unhandled = new Effect("Unhandled Promise Rejection", 1, "resilience", -2, "reduce target's resilience by 2");
unhandled.play(redBelt);       // resilience 7 - 2 = 5

// ----- Turn 3 -----
const pairProgramming = new Effect("Pair Programming", 3, "power", 2, "increase target's power by 2");
pairProgramming.play(redBelt); // power 3 + 2 = 5
redBelt.attack(blackBelt);     // Black Belt resilience 4 - 5 = -1

// ----- Final state -----
redBelt.print();
blackBelt.print();