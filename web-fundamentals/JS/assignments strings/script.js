//1//
let input="B";

switch(input){
    case "A":
        console.log("Excellent");
        break;
        case "B":
        console.log("Good Job");
        break;
        case "C":
        console.log("You passed");
        break;
        case "D":
        console.log("Need improvment");
        break;
        case "F":
        console.log("Failed");
        break;
        default:
            console.log("invalid grade");
} 


//2//
let str1="hello"
let vowels=0;
let digit = 0;
let spaces = 0;
let others = 0;

function countAll(str){
    for (let i = 0; i < str1.length; i++) {
        switch(str1[i]){
            case "a":
            case "e":
            case "i":
            case "o":
            case "u":
                vowels++;
                break;
            case " ":
            spaces++;
            break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            digit++;
            break;
            default:
            others++;
        }
        
    }
    var output = { vowels, digit, spaces, others};
    return output;
}
console.log(countAll("Hello 123"));



