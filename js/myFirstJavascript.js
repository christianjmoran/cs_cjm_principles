// only java here, no html
// it will read without semicolons, but use them anyway to be cool
// only javascript goes here NO HTML
// console.log will send data to the console terminal to display there
console.log("this is coming from a seperate file!");
// setting a variable equal to a value
let myVar = 5;
        console.log("my first console message");
        //display the variable in the console terminal
        console.log(myVar);
// 

alert("hello world");

// bool
let playing = true;
//constants
let width = 147;
let height = 190;
let x = 70;
let y = 70;
let z = [154, 223, 184, 243, 036, 377]
//player1 can change as a var
var player1 = "Bob";
//player2 will not change as a const
const player2 = "Bat_Man";

//me screwing around and it not working
// for loops in js
function loop(){
  for (i=0; i<10; i++){
    console.log(i);
    draw(z[i]);
  }
}

//funtion to make two rectangles that are blue and red with specified dimentions 
function draw() {
    // variable that allows tbe code to look for an element in the html doc with an ID of 'canvas'
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(200, 45, 345)';
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = 'rgba(200, 45, 345, 0.5)';
    ctx.fillRect(draw(z[i]), draw(z[i]), draw(z[i]), draw(z[i]));
  }

loop();