/*
FOR ENCRYPT:
1. Make a function to encrypt an input word.
2. Use a loop to take each letter of the word, assign it a position value, and then assign that position with a unique string.
3. Put each string together to get one large string.
4. Make a function that can take an input value, use the encrypt function, and then return the encrypted output.
5. Return the encryption.

FOR DECRYPT:
1. Run the encrypt function to get the encryption.
2. Make a loop that detects strings that have a corresponding letter. Replace each string with its corresponding letter.
3. Return the decrypted word.
*/
// global variables go at the top
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let Position = [0, 1, 2, 3, 4, 5, 6, 7, 8 , 9 , 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
let ENCRYPTED = ["hfhfh", "iefiow", "uerfhi", "weuhfuhw", "weufhuow", "iijwfe", "iweiojid", "iojdwej", "ioewjdioj", "ijwedoji", "iwfeofjj", "wiedk", "owend", "powkednj", "mcipweji", "klwdnnn", "pldwq", "okpwedopd", "ledwed", "mkdewpma", "pqpqpqjiw", "weufhufh", "mnbvcv", 'imedwkk', "pwoidl", "oijoij"]; 
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let word = 0;


function getInputValue() {
  // Selecting the input element and get its value 
  return document.getElementById("inputId").value;
  // Displaying the value
}

// utility functions
// check if is upper
function isupper(str) {
  return str === str.toUpperCase();
}

// check if is lower
function islower(str) {
  return str === str.toLowerCase();
}

function isNotNumber(str) {
  return str === !("a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m" || "n" || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z" || "A" ||  "B" || "C" || "D" || "E" || "F" || "G" || "H" || "i" || "J" || "K" || "L" || "M" || "N" || "O" || "P" || "Q" || "R" || "S" || "T" || "U" || "V" || "W" || "X" || "Y" || "Z");
}

function isNumber(str) {
  return str === "a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m" || "n" || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z" || "A" ||  "B" || "C" || "D" || "E" || "F" || "G" || "H" || "i" || "J" || "K" || "L" || "M" || "N" || "O" || "P" || "Q" || "R" || "S" || "T" || "U" || "V" || "W" || "X" || "Y" || "Z";
}

// return points by associating the index of the letter with the POINTS array
function getPoints(letter){
  let index = Letters.indexOf(letter);
  return POINTS[index];
}

//can you in JS perform an islower/isupper and strlen?
function computeScore(word){
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
        let despacito = word[i];
        let kanye = word[i].toLowerCase();
        if (islower(despacito)){
          console.log(despacito + ": this is lower case");
        }
        if (isupper(word[i])){
          console.log(despacito + " is upper case");
        }
        for (i = 0, n = word.length; i < n; i++){
          if (kanye = "a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m" || "n" || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z" || "A" ||  "B" || "C" || "D" || "E" || "F" || "G" || "H" || "i" || "J" || "K" || "L" || "M" || "N" || "O" || "P" || "Q" || "R" || "S" || "T" || "U" || "V" || "W" || "X" || "Y" || "Z"){
            console.log("letter is " + (kanye));
            console.log("letter score is " + getPoints(kanye));
            score += getPoints(kanye);
            console.log("Your Score Is: " + score);
          }
          if (despacito = !("a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m" || "n" || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z" || "A" ||  "B" || "C" || "D" || "E" || "F" || "G" || "H" || "i" || "J" || "K" || "L" || "M" || "N" || "O" || "P" || "Q" || "R" || "S" || "T" || "U" || "V" || "W" || "X" || "Y" || "Z")) {
            console.log("This is not a letter!!!");
            console.log("terminating: need to retry");
            return "Man you messed up bro";
          }  
        }
      }
  return score;
}

function doPoints(){
  let pointsValue = computeScore(getInputValue());
  output(pointsValue);
  return pointsValue;
}
//Find what place a letter is on the alphabet
function getPosition(letter){
  let index = Letters.indexOf(letter);
  return Position[index];
}

//encypt by taking each letter of the word and finding their alphabetical position, then assigning it a corresponding string and mashing them together to get one long string
 function encrypt(word){
    let escore = 0;
    let positionMyg = 0;
    for (i = 0, n = word.length; i < n; i++){
        positionMyg = getPosition(word[i]);
        escore += ENCRYPTED[positionMyg];
        console.log("escore is: ", escore); 
    }
    return escore;
 }

 //get an input and encypt it
 function doSomething(){
  let encryptedValue = encrypt(getInputValue());
  output(encryptedValue);
  return encryptedValue;
}

//run encypt of the input to get the encryption, then replace all the strings with their corresponding char to get the original word
 function decrypt(){
  let encryptedValue = encrypt(getInputValue());
  doSomething();
  Trump = encryptedValue;
  for (i = 0, n = 1; i < n; i++){
    var newTrump = Trump
      .replace("hfhfh", "a")
      .replace("iefiow", "b")
      .replace("uerfhi", "c")
      .replace("weuhfuhw", "d")
      .replace("weufhuow", "e")
      .replace("iijwfe", "f")
      .replace("iweiojid", "g")
      .replace("iojdwej", "h")
      .replace("ioewjdioj", "i")
      .replace("ijwedoji", "j")
      .replace("iwfeofjj", "k")
      .replace("wiedk", "l")
      .replace("owend", "m")
      .replace("powkednj", "n")
      .replace("mcipweji", "o")
      .replace("klwdnnn", "p")
      .replace("pldwq", "q")
      .replace("okpwedopd", "r")
      .replace("ledwed", "s")
      .replace("mkdewpma", "t")
      .replace("pqpqpqjiw", "u")
      .replace("weufhufh", "v")
      .replace("mnbvcv", "w")
      .replace("imedwkk", "x")
      .replace("pwoidl", "y")
      .replace("oijoij", "z");
    console.log(newTrump);
  }
  return newTrump;
}

//take the input and decrypt it
function doSomethingNOT(){
  let decryptedValue = decrypt(getInputValue());
  output(decryptedValue);
  return decryptedValue;
}
  // failing function due to inability to access element on page and alter it dynamically
  function output(content){
    document.getElementById("display1").innerHTML = content;
  } 

  