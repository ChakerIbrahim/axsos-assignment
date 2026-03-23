//1. Remove Blanks//
let result = "";
function removeBlanks(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      result += str[i];
    }
  }

  return result;
}

removeBlanks(" Pl ayTha tF u nkyM usi c ");
console.log(result);

//2. Get Digits//

function getDigits(str) {
  let result = "";
  for (i = 0; i < str.length; i++) {
    if (str[i] >= 0 && str[i] <= 9) {
      result += str[i];
    }
  }
  return result;
}
console.log(getDigits("abc8c0d1ngd0j0!8"));

//3. Acronyms//

function acronym(str) {
  var words = str.toUpperCase().split(" ");
  //console.log("words = " + words);
  let result = "";
  for (var i = 0; i < words.length; i++) {
    //console.log(words[i][0]);
    result += words[i][0];
  }

  return result;
}

console.log(acronym("there's no free lunch - gotta pay yer way."));

//4. Count Non-Spaces//

function countNonSpaces(str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      count = count + 1;
    }
  }
  return count;
}

console.log(countNonSpaces("Honey pie, you are driving me crazy"));

//5. Remove Shorter Strings//

function removeShorterStrings(arr, minLength) {
    var result = [];
    for(var i=0 ; i<arr.length ; i++){
        if(arr[i].length>=minLength){
            result.push(arr[i]);
        }
    }
    return result;
}
console.log(removeShorterStrings(['Good morning', 'sunshine', 'the', 'Earth', 'says', 'hello'], 4)); 