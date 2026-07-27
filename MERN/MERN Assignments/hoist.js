//var example;
console.log(example);
var example = "I'm the example!";
//output = undefined
// var example;
// console.log(example);
// example = "I'm the example!";
//-----------------------------
console.log(example);
let example = "I'm the example!";
//output = error
//No Hoist
//-----------------------------
console.log(hello);
var hello = "world";
//output = undefined
// var hello;
// console.log(hello);
// hello = "world";
//-----------------------------
var needle = "haystack";
test();
function test() {
  var needle = "magnet";
  console.log(needle);
}
//output = magnet;
// function test() {
//     var needle;
 
//     needle = "magnet";
//     console.log(needle);
// }
 
// var needle;
 
// needle = "haystack";
 
// test();
//-----------------------------
 
var brendan = "super cool";
 
function print() {
  brendan = "only okay";
  console.log(brendan);
}
console.log(brendan);
 
//output = super cool
//function print() {
//     brendan = "only okay";
//     console.log(brendan);
// }
 
// var brendan;
 
// brendan = "super cool";
 
// console.log(brendan);
//------------------------------
 
var food = "chicken";
console.log(food);
 
eat();
 
function eat() {
  food = "half-chicken";
 
  console.log(food);
 
  var food = "gone";
}
//output = chicken then half-chicken
// function eat() {
 
//     var food;
 
//     food = "half-chicken";
//     console.log(food);
 
//     food = "gone";
// }
 
// var food;
 
// food = "chicken";
 
// console.log(food);
 
// eat();
//---------------------------------
mean();
console.log(food);
var mean = function () {
  food = "chicken";
  console.log(food);
  var food = "fish";
  console.log(food);
};
console.log(food);
//output = error
// var mean;
// var food;
 
// mean(); // TypeError: mean is not a function
 
// console.log(food);
 
// mean = function () {
 
//     var food;
 
//     food = "chicken";
//     console.log(food);
 
//     food = "fish";
//     console.log(food);
// };
 
// console.log(food);
//-----------------------------------
console.log(genre);
 
var genre = "disco";
rewind();
 
function rewind() {
  genre = "rock";
 
  console.log(genre);
 
  var genre = "r&b";
  console.log(genre);
}
 
console.log(genre);
//output =  undefined /rock/r&b/disco4
// function rewind() {
 
//     var genre;
 
//     genre = "rock";
//     console.log(genre);
 
//     genre = "r&b";
//     console.log(genre);
// }
 
// var genre;
 
// console.log(genre);
 
// genre = "disco";
 
// rewind();
 
// console.log(genre);
//--------------------------------------
 
dojo = "san jose";
 
console.log(dojo);
 
learn();
 
function learn() {
  dojo = "seattle";
 
  console.log(dojo);
 
  var dojo = "burbank";
  console.log(dojo);
}
 
console.log(dojo);
// output = sanjose seattle burbank sanjose
// function learn() {
 
//     var dojo;
 
//     dojo = "seattle";
//     console.log(dojo);
 
//     dojo = "burbank";
//     console.log(dojo);
// }
 
// dojo = "san jose";
 
// console.log(dojo);
 
// learn();
 
// console.log(dojo);
//-----------------------------------------
 
console.log(makeDojo("Chicago", 65));
 
console.log(makeDojo("Berkeley", 0));
 
function makeDojo(name, students) {
  const dojo = {};
  dojo.name = name;
 
  dojo.students = students;
 
  if (dojo.students > 50) {
    dojo.hiring = true;
  } else if (dojo.students <= 0) {
    dojo = "closed for now";
  }
 
  return;
  dojo;
}
 
//output = undefined then error
// function makeDojo(name, students) {
//   const dojo = {};
 
//   dojo.name = name;
//   dojo.students = students;
 
//   if (dojo.students > 50) {
//     dojo.hiring = true;
//   } else if (dojo.students <= 0) {
//     return "closed for now";
//   }
 
//   return dojo;
// }
 
// console.log(makeDojo("Chicago", 65));
// console.log(makeDojo("Berkeley", 0));