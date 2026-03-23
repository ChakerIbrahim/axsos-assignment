//1. Reverse a String //

let str = "hello";
let result = "";

function reverseString(str) {
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}

console.log(reverseString(str));


//2. Count Vowels //

let str1 = "hello";
let count = 0;

function countvowel(str) {
    for (let i = 0; i < str1.length; i++) {
        if (
            str1[i] === "a" ||
            str1[i] === "e" ||
            str1[i] === "i" ||
            str1[i] === "o" ||
            str1[i] === "u"
        ) {
            count++;
        }

    }
    return count;
}

console.log(countvowel(str1));


//3. Check Palindrome //
let str_ = "madam";
let result_ = "";

function reverseString(str) {
    for (let i = str.length - 1; i >= 0; i--) {
        result_ += str_[i];
    }
    if(result_==str_){
        console.log("true");
    }
    return result_;

}

console.log(reverseString(str));

//4. Longest Word in a Sentence //




function longestWordInString(str) {
    var words = str.split(" ");
    var longestword = words[0];
    for(var i=1 ; i<words.length ; i++){
        if(words[i].length>longestword.length){
            longestword=words[i];
        }
    }
    return longestword;
}console.log(longestWordInString("I love programming"));

