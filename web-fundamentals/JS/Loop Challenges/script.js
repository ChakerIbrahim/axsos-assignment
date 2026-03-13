//1. Display odd numbers//
for(var i=1 ; i<=20 ; i++){
    if(i%2!==0){
        console.log(i);
    }
}

//2. Decreasing multiples of 3 //
for(var i=100 ; i>=0 ; i--){
    if(i%3==0){
        console.log(i);
    }
}

//3. Print the given sequence//
let num = 4;

for (let i = 0; i < 6; i++) {
    console.log(num);
    num = num - 1.5;
}

//4. Sigma//
let sum = 0;
for(var i=1 ; i<=100 ; i++){
    sum=sum+i;
}
console.log(sum);

//5. Factorial //
let product = 1;
for(var i=1 ; i<=12 ; i++){
    product=product*i;
}
console.log(product);