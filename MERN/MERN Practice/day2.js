const user1 ={
    name:"Kermit",
    email:"kermit@sesame.org",
    friend:{
        name:"Miss Piggy",
        email:"piggy@sesame.org"
    }
}
class Vehicle {
    constructor(manufacturer, model, color) {
        this.miles = 0;
        this.manufacturer = manufacturer;
        this.model = model;
        this.color = color;
    }

    drive() {
        this.miles += 10;
        console.log('You drove your${this.constructor.name} and it now has ${this.miles}miles on it.');
    }

    parentFunction(){
        return "This is coming from the parent!";
    }
}

const car = new Vehicle("BMW", "M5", "blue");
car.drive();
console.log(car.miles);


class MS extends Vehicle {
    constructor(color) {
        super("BWN", "M5", color);
        this.hp = 616;
    }

    childFunction(){
        const message =super.parentFunction();
        console.log(message)
    }
    
    printSpecSummary() {
        console.log(
            'BMW M5 with a 4.4L V8 Twin Turbo engine packin ${this.hp}HP and 553 lb-ft TQ'
        );
    }
}

const m5 =new M5("Blue");
m5.childFunction();


setTimeout(function(){
    console.log("start")
},3000);
console.log("end");

typeof("hello");
typeof(function(){});

var exampleFunction = function(message){
    console.log(message);
};
exampleFunction("Hello from exampleFunction");

function parentFunction(callback){
    callback("information from the parent function");
}

parentFunction(exampleFunction);

parentFunction(function(message){
    console.log(message);
})

const arr=[1,2,3,4];
arr.push(300);

const arr = Object.freeze([1,2,3,4]);
arr.push(300);

const groceryList=Object.freeze([
    {"item":"carrots", "haveIngredient":false},
    {item:"onions", "haveIngredient":true},
    {"item":"celery", "haveIngredient":false},
    {"item":"cremini mushrooms", "haveIngredient":false},
    {"item":"butter", "haveIngredient":true}
]);

const needThyme=[...groceryList,{"item":"thyme","haveIngredient":false}];

const needThyme = groceryList.concat([{"item":"thyme", "haveIngredient":false}]);

const gotTheThyme =[...needThyme.slice(0,5),{...needThyme[5], "haveIngredient":true}];

const noNeceCelery=[...gotTheThyme.slice(0,2),...gotTheThyme.slice(3)];

const items= Object.freeze(["carrots","onions","celery","mushrooms","butter","butter","thyme"]);
items.sort();

const sortedItems=[...items].sort();

const numbers=[10,5,3,12,22,8];
numbers.sort();

const sortedGroceries=[...groceryList].sort((a,b)=>a.item>b.item?1:-1);

const groceries=["pearl onions","cremini mushrooms","thyme"];
const groceryList=groceries.map(item=>'<li>${item}</li>');

const values=[1,2,3,4,5];
const cubes = values.map(val=>val**3);

const values=[1,2,3,4,5];
const evens = values.filter(val=>val%2===0);

const groceries=["pearl onions","cremini mushrooms","thyme"];
const oFoods=groceries.filter(item=>item.includes("o"));

const values=[1,2,3,4,5];
const oddCubes=values.filter(val=>%2!==0).map(val=>val**3);