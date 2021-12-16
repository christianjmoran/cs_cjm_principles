// global variables
let canvas;
let ctx;
let timerThen = null;
let TILESIZE = 64;
let WIDTH = TILESIZE * 22;
let HEIGHT = TILESIZE * 9;
let allSprites = [];
let walls = [];
let enemies = [];
let allProjectiles = [];
let playerImage = new Image();
playerImage.src = "images/kanye.jpg"
let blockImage = new Image();
blockImage.src = "images/kanye.jpg"
let pewImage = new Image();
pewImage.src = "images/kanye.jpg"
// let deadFish = new Image();
// pewImage.src = "../mywebsite/images/deadfish.png"


let gamePlan1 = `
......................
..#.......@........#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;
let gamePlan2 = `
BBBBBBBBBBBBBBBBBBBBBB
B.#.......@........#..
B.#...@.......#....#..
B.#...B.....@......#..
B.#........#####...#..
B.#####............#..
B.....#............#..
B.....##############..
BBBBBBBBBBBBBBBBBBBBBB`;
let gamePlan3 = `
......................
..#.......@........#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;

// get user input from keyboard
let keysDown = {};
let keysUp = {};

// let mouseCoords = [];
// let rect = canvas.getBoundingClientRect();
// addEventListener('mousedown', mouseClick);

// function mouseClick(e) {
//     console.log(`
//     Screen X/Y: ${e.screenX}, ${e.screenY}
//     Client X/Y: ${e.clientX - rect.left}, ${e.clientY - rect.top}`);
//     mouseCoords = [e.clientX - rect.left, e.clientY - rect.top];
//     console.log("mouse coords array " + mouseCoords);
//     player1.frost();
// }

let choices = ["fire", "air", "water", "earth", "heart"];

function randSelect(arr){
 let choice =  Math.floor(Math.random()*arr.length);
//  console.log('rand func ' + arr[choice]);
 return arr[choice];

}
randSelect(choices);
let computerChoice = randSelect(choices);
console.log("the computer chose " + computerChoice);

addEventListener("keydown", function (event) {
    // keysDown = {};
    keysDown[event.key] = true;
    // console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysUp[event.key] = true;
    delete keysDown[event.key];
    setTimeout(()=> delete keysUp[event.key], 1)
    // console.log(event);
}, false);

function drawText(r, g, b, a, font, align, base, text, x, y) {
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = base;
    ctx.fillText(text, x, y);
}

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}

class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.spliced = false;
        allSprites.push(this);
    }
    get cx() {
        return this.x + this.w * 0.5;
    }
    get cy() {
        return this.y + this.h * 0.5;
    }
    get left() {
        return this.x
    }
    get right() {
        return this.x + this.w
    }
    get top() {
        return this.y
    }
    get midtop() {
        return this.y + this.w * 0.5;
    }
    get bottom() {
        return this.y + this.h
    }
    get midbottom() {
        return (this.y + this.h) + this.w * 0.5
    }
    get type() {
        return "sprite";
    }
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    collideWith(obj, buffer) {
        if (this.right >= obj.left + buffer &&
            this.left <= obj.right - buffer &&
            this.bottom >= obj.top + buffer &&
            this.top <= obj.bottom - buffer
        ) {
            return true;
        }
    }
    // modified from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/rectangle-collision/rectangle-collision.html
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}


class Player extends Sprite {
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.timesJumped = 0;
        this.canShoot = true;
        this.gravity = 0.98;
        this.coFriction = 0.1;
        this.jumpPower = 15;
        this.damaged = false;
        this.color = color;
        this.hitpoints = hitpoints;
    }

    jump() {
        this.vy = -this.jumpPower;
        
        console.log(this.timesJumped);
    }
    pewpew() {
        let p = new PewPew(this.x + this.w * 0.333, this.y, TILESIZE / 4, TILESIZE / 4);
    }


    get type() {
        return "player";
    }
    input() {
        // checks for user input
        if ("a" in keysDown) { // Player holding left
            this.vx = -this.speed;
        } else if ("d" in keysDown) { // Player holding right
            this.vx = this.speed;
        } else if (" " in keysDown) { // Player holding jump
            if (this.timesJumped < 2){
                this.jump();
            }
        }
        else if (" " in keysUp) { // Player holding jump
            setTimeout(() => this.timesJumped++, 200);
            console.log('space in keysup');
        }
        else if ("w" in keysDown) {
            if (this.canShoot) {
                this.pewpew();
                this.canShoot = false;
                setTimeout(() => this.canShoot = true, 500);

            }
        }
        else if ("t" in keysDown) {
            timerThen = performance.now();
            timerStarted = true;
        }
    }
    frictionX() {
        if (this.vx > 0.5) {
            this.vx -= this.coFriction;
        } else if (this.vx < -0.5) {
            this.vx += this.coFriction;
        }
        else {
            this.vx = 0;
        }
    }

    update() {
        this.vy += this.gravity;
        this.input();
        this.frictionX();
        this.x += this.vx;
        this.y += this.vy;
        for (i of allSprites) {
            if (this.bottom < HEIGHT - 2) {
                // this.timesJumped = 0;
            }
            if (i.type == "wall") {
                if (this.collideWith(i, 0)) {
                    let diff = Math.abs(this.cx - i.cx);
                    if (diff <= TILESIZE) {
                        if (this.y > i.cy) {
                            this.y = i.bottom;
                        }
                        else {
                            this.y = i.top - this.h;
                            this.timesJumped = 0;
                            this.vy = 0
                        }

                    }
                    if (this.cy > i.cy) {
                        if (this.vx > 0) {
                            this.x = i.left - this.w;
                        }
                        else if (this.vx < 0) { this.x = i.right }
                    }

                }
            }
        }

        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y + this.h > HEIGHT) {
            this.y = HEIGHT - this.h;
        }
        if (this.y <= 0) {
            this.y = 0;
        }

    }
    //     draw(){
    //         ctx.drawImage(playerImage, 0, 0, TILESIZE/2, TILESIZE/2, this.x, this.y, TILESIZE, TILESIZE);
    // }

}

class Enemy extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.vx = 1;
        this.vy - 0;
        this.w = w;
        this.h = h;
        this.speed = 6;
        this.alive = true;
        this.color = "blue";
        enemies.push(this);

    }
    create(x, y, w, h) {
        return new Enemy(x, y, w, h);
    }
    get type() {
        return "enemy";
    }
    // if you want to get crazy...do this
    // rotate() {
    //     ctx.save();
    //     ctx.translate(this.x, this.y);
    //     ctx.rotate(127);
    //     ctx.translate(-this.x, -this.y);
    //     ctx.restore();
    // }

    update() {

        this.x += this.vx * this.speed;
        // this.rotate();
        for (i of allSprites) {
            if (i.type == "wall") {
                if (this.collideWith(i, 1)) {
                    if (this.cx < i.cx) {
                        this.speed = -6;
                    }
                    else {
                        this.speed = 6;
                    }

                }

            }
        }
    }
    draw() {
        if (!this.alive) {
            ctx.fillStyle = 'grey';
        }
        else {
            ctx.fillStyle = this.color;
        }
        ctx.fillRect(this.x, this.y, this.w, this.h);

    };
}


class Wall extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 0;
        this.color = "red";
        walls.push(this);
    }
    get type() {
        return "wall";
    }
    create(x, y, w, h) {
        return new Wall(x, y, w, h);
    }
    update(obj) {
        this.vx = -obj.vx;
        this.x += this.vx;
        this.vy = -obj.vy;
        this.y += this.vy;
        // console.log('updating...')
    }
    draw() {
        ctx.drawImage(blockImage, 0, 0, TILESIZE / 2, TILESIZE / 2, this.x, this.y, TILESIZE, TILESIZE);
    }
}
class PewPew extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
        allProjectiles.push(this);
        console.log('a pewpew was created...');
        console.log(allProjectiles);
    }

    update() {
        this.y -= 10;
    }
    draw() {
        ctx.drawImage(pewImage, 0, 0, TILESIZE / 2, TILESIZE / 2, this.x, this.y, TILESIZE, TILESIZE);
    }
}
class Block extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
    }
    get type() {
        return "wall";
    }
    create(x, y, w, h) {
        return new Block(x, y, w, h);
    }

}

let myOneWall = new Wall(700, HEIGHT - 100, TILESIZE, 100);

const levelChars = {
    ".": "empty",
    "#": Wall,
    "@": Enemy,
    "B": Block

};

function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    return newGrid;
}

console.log("here's the grid...\n" + makeGrid(gamePlan2, 22));

function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x in grid[y]) {
            /*              crate a variable based on the current
            item in the two dimensional array being read
             */
            let ch = grid[y][x];
            /* if the character is not a new line character
            create a variable from the value attached to the 
            key in the object, e.g. 

            const levelChars = {
                ".": "empty",
                "#": Square,
            };

            where "." is the key and the value is "empty"
            In the case of "#", the key is "#" and the value
            is the Square class.
            
            */
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                } else {


                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(new type(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan2, 22));

// instantiations...
let player1 = new Player(WIDTH / 3, HEIGHT / 3, 6, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);

let maxEnemies = 5;
function update() {
    player1.update();
    if (enemies.length <= 0) {
        for (i = 0; i < maxEnemies - enemies.length; i++) {
            let myRange = Math.floor(Math.random() * 500) + TILESIZE * 3;
            let e = new Enemy(myRange, Math.floor(Math.random() * 3) * TILESIZE, TILESIZE, TILESIZE);
            console.log("it happen");

        }
        // console.log(enemies)
        // console.log(allSprites)
        // allSprites = [];
        // let currentLevel = readLevel(makeGrid(gamePlan3, 22));


    }
    for (e of enemies) {
        for (p of allProjectiles) {
            if (p.collideWith(e, 0)) {
                console.log('projectile collided with enemy...');
                e.alive = false;
                p.spliced = true;
                e.spliced = true;
            }
        }
        if (player1.collideWith(e, 0)) {
            if (!player1.damaged) {
                player1.damaged = true;
                console.log('ouch');
                setTimeout(() => {
                    player1.damaged = false;
                }, 2000);
            }

        }
        e.update();
    }
    for (p of allProjectiles) {
        if (p.y < 0) {
            p.spliced = true;
        }
        p.update();
    }
    for (w of walls){
        w.update(player1);
    }
    for (p in allProjectiles) {
        if (allProjectiles[p].spliced) {
            allProjectiles.splice(p, 1);
            // allSprites.splice(p,1);
        }
    }
    for (e in enemies) {
        if (enemies[e].spliced) {
            enemies.splice(e, 1);

        }
    }
    for (s in allSprites) {
        if (allSprites[s].spliced) {
            allSprites.splice(s, 1);
        }
    }


}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "FPS: " + fps, 256, 32);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "projectiles: " + allProjectiles.length, 256, 64);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "enemies: " + enemies.length, 256, 96);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "Timer: " + currentTimer, 256, 128);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "Times jumped: " + player1.timesJumped, 256, 160);

}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (like a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

let then = performance.now();
let now = null;
let runtime = null;
let fps = null;

console.log("this is perf now " + performance.now())

let currentTimer = 0;
let timerStarted = false;


function timer() {
    if (timerStarted) {
        let now = performance.now();
        let delta = Math.floor((now - timerThen) / 1000);
        currentTimer = delta;
        console.log(currentTimer);
        return delta;
    }
}


let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    now = performance.now();
    let delta = now - then;
    fps = (Math.ceil(1000 / delta));
    totaltime = now - then;
    then = now;
    if (timerStarted) {
        console.log('timer has stared...');
        timer();
    }
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}
