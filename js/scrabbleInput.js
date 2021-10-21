// global variables go at the top
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let player1score = 0;
let player2score = 0;
let word = 0;

// utility functions
// check if is upper
function isupper(str) {
  return str === str.toUpperCase();
}

// check if is lower
function islower(str) {
  return str === str.toLowerCase();
}

// return points by associating the index of the letter with the POINTS array
function getPoints(letter){
  let index = Letters.indexOf(letter);
  return POINTS[index];
}

// can you in JS perform an islower/isupper and strlen?
function computeScore(word){
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
        // if (islower(word[i])){
        //   console.log(word[i] + "this is lower case");
        // }
        // if (isupper(word[i])){
        //   console.log(word[i] + " is upper case");
        // }
        console.log("letter is " + (word[i]));
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        score += getPoints(word[i].toLowerCase());
        console.log("final score here " + score);
    }
    return score;
}

computeScore("hello");


// SCOPE>>>>>>>>>>>

function getInputValue() {
    // Selecting the input element and get its value 
    return document.getElementById("inputId").value;
    // Displaying the value
  }

 function doSomething(){
    let score = computeScore(getInputValue())
    alert("You scored " + score );
    output("you scored " + score + " points.");
  }

  // failing function due to inability to access element on page and alter it dynamically
  function output(content){
    document.getElementById("display").innerHTML = content;
  }