// global variables
let canvas;
let ctx;

//assign values here
function init() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');
    console.log("game initialized")
    //appends body with canvas variable value
    document.body.appendChild(canvas);
    gameLoop();
}


// Using the CanvasRenderingContext2D we have access to draw and fill commands
function draw() {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = 'rgba(0, 0, 200, .2)';
    ctx.fillRect(30, 30, 50, 50);
}

let gameLoop = function () {
    //update()
    draw();
    window.requestAnimationFrame(gameLoop);
}