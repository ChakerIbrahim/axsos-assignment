//1. Accessing Elements//
let colors= ["red" , "blue" , "green" , "yellow" , "purple"];
console.log(colors[0]);
console.log(colors[4]);
console.log(colors[1]);
colors.splice(2,0,"orange");
console.log(colors);


//2. Traversing an Array//
let numbers = [10, 20, 30, 40, 50];
for(var i=0 ; i<numbers.length ; i++){
    console.log(numbers[i]);
}
for(var i=numbers.length ; i>0 ; i--){
    console.log(numbers[i]);
}


//3. Searching in an Array//
numbers = [5, 10, 15, 20, 5];
var Found=false;
for(var i=0 ; i<numbers.length ; i++){
    if(numbers[i]==25){
        console.log("Found at postition "+i);
        Found=true;
    }
}
    if(Found==false){
        console.log("Not Found");
    }

//4. Sorting an Array//
let scores=[50, 20, 70, 10, 40];
scores.sort();
console.log(scores);

scores.sort((a, b) => b - a);
console.log(scores);

let names = ["Shatha", "Sara", "Lina","Sami","Dalia"];
names.sort();
console.log(names);

//5. Inserting Elements//
let animals = ["dog", "cat", "rabbit"];
animals.push("elephant");
animals.unshift("lion");
animals.splice(2,0,"tiger");
console.log(animals);

//6. Deleting Elements//
let fruits = ["apple", "banana", "cherry", "date"];
fruits.shift();
fruits.pop();
fruits.splice(0,1);
console.log(fruits);

//7. Combining Arrays//
let array1 =[1, 2, 3,];
let array2 =[,4, 5, 6];
let newarray=[];
newarray=array1 + array2;
console.log(newarray);

//8. Splitting an Array//
let items = ["a", "b", "c", "d", "e"];
let newarray = [];
newarray.push(items[3]);
newarray.push(items[4]);
items.pop();
items.pop();
console.log(items);
console.log(newarray);


//9. Filtering Elements//
let numbers = [1, 5, 10, 15, 20, 25, 30];
let newarray = [];
for(var i=0 ; i<numbers.length ; i++){
    if(numbers[i]>15){
        newarray.push(numbers[i]);
    }
}
console.log(newarray);

//10. Advanced Challenge//
//a//
let array = [1, 2, 2, 3, 4, 4, 5];
let newarray = [];
for(var i=0 ; i<array.length ; i++){
    if(array[i]==array[i+1]){
        continue;
    }
    else{
        newarray.push(array[i]);
    }
}
console.log(newarray);

//b//
let array = [1, 2, 3, 4, 5];
let newarray = [];
let num = 2;
for(var i=array.length-num ; i<array.length; i++){
    newarray.push(array[i]);
}
for(var i=0 ; i<array.length - num ; i++){
    newarray.push(array[i]);
}
console.log(newarray);


//Bonus Challenge//

function mergeSortedArrays(arr1, arr2) {
    const result = [];
    let i = 0; 
    let j = 0;  
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }
    return result;
}
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));     






