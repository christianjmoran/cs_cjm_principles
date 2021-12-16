/* THINGS I HAVE ACCOMPLISHED

1. Change gameplan and collision
2. Make a system for enemies to spawn on both sides of the screen randomly and come towards the middle
3. create stages or waves of the enemies spawning
4. used Mr. Cozort's timer system with the addition of having it stop when collision takes place as a form of score
5. Display things like fps, score, time, and messages I added in

NOTE:
No outside sources were used other than what Mr. Cozort provuded
*/
// global variables
let canvas;
let ctx;
// used later so that the timer can start
let timerThen = null;
// general building blocks of all objects
let TILESIZE = 64;
// general parameters for the game board
let WIDTH = TILESIZE * 22;
let HEIGHT = TILESIZE * 11;
// array that will hold notspliced sprites
let allSprites = [];
// array that will hold sprites
let walls = [];
// array that will hold notspliced enemies
let enemies = [];
// array that will hold what the current level is
let level = [];
let playerImage = new Image();
playerImage.src = "images/kanye.jpg"
let blockImage = new Image();
blockImage.src = "images/kanye.jpg"
let enemyImage = new Image();
enemyImage.src = "images/kanye.jpg"
// enemyImage.src = "images/nuke5.png"
let start = false;
let gamePlaying = null;

//manual way of assigning objects to certain places on the canvas
let gamePlan = `
######################
#....................#
#....................#
#....................#
#....................#
#....................#
#....................#
#....................#
#....................#
#....................#
######################`;

// get user input from keyboard
let keysDown = {};
let keysUp = {};

addEventListener("keydown", function (event) {
    keysDown = {};
    keysDown[event.key] = true;
    // console.log(keysDown);
    // console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysUp[event.key] = true;
    delete keysDown[event.key];
    // console.log(keysDown);
}, false);

let emptyArrayKD = false;
for (i = 0; i > 0; i++) {
    if (keysDown = false) {
        emptyArrayKD = true;
    }
    if (keysDown = false) {
        emptyArrayKD = true;
    }
}

//used to write text for fps, time, level, and comments later
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

// the main class that enemies, player, and wall will we build off of
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
    get type() {
        return "sprite";
    }
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    // general colision from all 4 sides
    collideWith(obj) {
        if (this.x + this.w >= obj.x &&
            this.x <= obj.x + obj.w &&
            this.y + this.h >= obj.y &&
            this.y <= obj.y + obj.h
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

// first subclass
// allows us to use the characteristics of a general sprite, but make is more specific to the player
class Player extends Sprite {
    constructor(x, y, speed, w, h, color) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        // vx and vy are velocity (dirrection and speed)
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    collideWith(obj) {
        if (this.x + this.w > obj.x &&
            this.x < obj.x + obj.w &&
            this.y + this.h > obj.y &&
            this.y < obj.y + obj.h
        ) {
            return true;
        }
    }
    get type() {
        return "player";
    }
    input() {
        // checks for user input
        if ("a" in keysDown) {
            this.vx = -this.speed;
        }
        else if ("d" in keysDown) { // Player holding right
            this.vx = this.speed;
        }
        else if ("s" in keysDown) { // Player holding right
            this.vy = this.speed;
        }
        else if ("w" in keysDown) { // Player holding right
            this.vy = -this.speed;
        }
        else if (keysUp) { // player does not want to move
            this.vy = 0;
            this.vx = 0;
        }
    }
    update() {
        // in order to update the player, you need its input
        this.input();
        // assign the x and y values increasing at the rate of velocity, so if vx = 6, the x value will change 6 units right every innterval (1000ms?)
        this.x += this.vx;
        this.y += this.vy;
        for (i of allSprites) {
            if (i.type == "wall") {
                //I initially tried to make collision mechanics that would behave when the player colided with wall objects...
                // the problem is when the player hits two walls it freaks out...
                // to avoid this, I simple changed HEIGHT and WIDTH so that is would be blocked by that, not coliding with walls.

                // if (this.collideWith(i)) {
                //     let diffr = i.x - this.w;
                //     let difft = i.h - this.y;
                //     let diffl = i.w - this.x;
                //     let diffb = i.y - this.h;
                //     let diffr2 = i.x - this.w;
                //     let difft2 = i.h - this.y;
                //     let diffl2 = i.w - this.x;
                //     let diffbr = this.x - i.x;
                //     let diffbl = this.w - i.x;
                //     // let diffbw = 
                //     if (diffr = 0 && this.vx > 0) {
                //         console.log("right");
                //         this.vx = 0;
                //         this.x = i.left - this.w;
                //     }
                //     if (difft = 0 && this.vy < 0) {
                //         this.vy = 0;
                //         console.log("top");
                //         this.y = i.bottom;

                //     }
                //     if (diffl = 0 && this.vx < 0) {
                //         this.vx = 0;
                //         this.x = i.right;
                //         console.log("left");
                //     }
                //     if (diffb = 0 && this.vy > 0 && this.vx > 0) {
                //         console.log("bottom");
                //         this.vy = 0;
                //         this.y = i.top - this.h;
                //         // this.x = i.x + diffbr
                //     }
                //     if (diffb = 0 && this.vy > 0 && this.vx < 0) {
                //         console.log("bottom");
                //         this.vy = 0;
                //         this.y = i.top - this.h;
                //         // this.x = i.x + diffbr
                //     }


                // }
            }
        }
        // Colision with WIDTH and HEIGHT
        if (this.x + this.w + TILESIZE > WIDTH) {
            this.x = WIDTH - TILESIZE - this.w;
        }
        if (this.x <= TILESIZE) {
            this.x = TILESIZE;
        }
        if (this.y + this.h + TILESIZE > HEIGHT) {
            this.y = HEIGHT - TILESIZE - this.h;
        }
        if (this.y <= TILESIZE) {
            this.y = TILESIZE;
        }

    }
    // delete player from its array to remove it
    spliced() {
        this.spliced = true;
    }
    // tells the computer what dimentions and how to draw the player
    draw() {
        ctx.drawImage(playerImage, 0, 0, TILESIZE / 2, TILESIZE / 2, this.x, this.y, TILESIZE / 1.5, TILESIZE / 1.5);
    }
}

// another subclass, this time for walls
// even though nothing will be coliding with walls, becuase I already have it as a reasourse, it was the easiest way to draw boundaries
class Wall extends Sprite {
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
        return new Wall(x, y, w, h);
    }
    // tell computer how to draw the walls
    draw() {
        ctx.drawImage(blockImage, 0, 0, TILESIZE / 2, TILESIZE / 2, this.x, this.y, TILESIZE, TILESIZE);
    }
}

// final subclass of sprite
// in this instance, the enemies are the missiles you want to avoid
class Enemy extends Sprite {
    constructor(x, y, speed, w, h, color) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.vx = 1;
        this.vy = 0;
        this.w = w;
        this.h = h;
        this.speed = speed;
        // will discus these bolleans later
        this.alive = true;
        this.spawned = false;
        this.color = color;
        // can push themselves into the array
        enemies.push(this);

    }
    create(x, y, speed, w, h, color) {
        return new Enemy(x, y, speed, w, h, color);
    }
    get type() {
        return "enemy";
    }
    update() {
        this.x += this.vx * this.speed;
    }
    draw() {
        ctx.drawImage(enemyImage, 0, 0, TILESIZE / 2, TILESIZE / 2, this.x, this.y, TILESIZE * 2, TILESIZE*0.5);
    }
}


const levelChars = {
    ".": "empty",
    "#": Wall,
    "@": Enemy,
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

console.log("here's the grid...\n" + makeGrid(gamePlan, 22));

// allows the computer to analyze the gamePlan and create it
function readLevel(grid) {
    // an array that will hold the objects of the gamePlan
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
           // when it reads though a row before hitting a new line, it will push that object into the array
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                } else {
                    /*  
                    Here we can use the x and y values from reading the grid, 
                    then adjust them based on the tilesize
                    */
                    startActors.push(new type(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE))
                }
            }
        }
    }
    return startActors;
}

//tells the computer to read the level and create the gamePlan we have assigned
let currentLevel = readLevel(makeGrid(gamePlan, 22));

console.log("here's the current level " + currentLevel);

// instantiation of the player
let player1 = new Player(WIDTH / 6, HEIGHT / 3, 6, TILESIZE / 1.5, TILESIZE / 1.5, 'rgb(100, 100, 100)');

function enemiesSpawned() {
    // generate a number between 1 and 99
    let chance = 100 * Math.random();
    // 50% chance of either if statement being true
    // if it happens to be this one, missiles will spawn on the right side of the right side of the screen and move leftward
    // it will also be random which y value the missile will have
    if (chance > 50) {
        let e = new Enemy((WIDTH - TILESIZE), Math.floor(Math.random() * (HEIGHT - TILESIZE * 3)) + TILESIZE, -2, TILESIZE * 2, TILESIZE*0.5, 'rgb(230, 230, 250)');


    }
    // if it happens to be this one, missiles will spawn on the left side of the left side of the screen and move rightward
    // it will also be random which y value the missile will have
    if (chance <= 50) {
        let e = new Enemy(0, Math.floor(Math.random() * (HEIGHT - TILESIZE * 3)) + TILESIZE, 2, TILESIZE * 2, TILESIZE*0.5, 'rgb(230, 230, 250)');

    }
}

//I just used this to check if enemies where being spawned, and now it is being used but not neccesary
function spawnEm() {
    enemiesSpawned();
    console.log("enemies spawned");

}

// all of these booleans are needed to execute switching between stages and generating missiles in different volumes
// can spawn is the main boolean that allows for me to make rates on enemies spawning. It starts off as true, then goes through update...
// causing an enemy to spawn, then is made false with a timer to turn true again after a certain genrate
let canSpawn1 = true;
let canSpawn2 = true;
let canSpawn3 = true;
let canSpawn4 = true;
let canSpawn5 = true;
let canSpawn6 = true;
let canSpawn7 = true;

// after a certain amount of time after the first enemy is spawned on a certain stage, this will be true, resulting it that stage ending and the next starting
let canIncrease1 = false;
let canIncrease2 = false;
let canIncrease3 = false;
let canIncrease4 = false;
let canIncrease5 = false;
let canIncrease6 = false;
let canIncrease7 = false;

// the rates at which missiles will spawn in each stage
let genRate1 = 6000;
let genRate2 = 5000;
let genRate3 = 4000;
let genRate4 = 3500;
let genRate5 = 3000;
let genRate6 = 2500;
let genRate7 = 2000;

//stage starts off at 0 but becomes one after the stage one's first enemy is spawned. Continues for the other stages
// mainly used later to display the stage in drawing text
let stage = 0;
// will be used later to communucate through phrases with whoever is playing. Starts of as null so that it starts off with nothing but will be populated each stage
let words = null;

// global update
// will be run everytime the gameLoop runs which will deal with all of the moving parts, making the game not static
function update() {
    // making sure we are on stage one and the game
    if (canSpawn1 && !canIncrease1 && (gamePlaying || gamePlaying == null)) {
        console.log("can spawn1");
        // by making this true, it is no longer null, so when we make it false, we can stop the timer
        gamePlaying = true;
        // we can display this only for this stage
        stage = 1;
        // we can display this only for this stage
        words = "WASD";
        // will make the timer start
        timerThen = performance.now();
        // will help us turn off the timer later
        timerStarted = true;
        // spawn an enemy, will repeate as this will get recalled every genRate1
        spawnEm();
        // boolean loop alows us to control how often we generate stage one missiles, in this case, by genRate1
        canSpawn1 = false;
        setTimeout(() => {
            canSpawn1 = true;
        }, genRate1);
        // after 10 sec, the next stage will be initiated and will cause this one to stop
        setTimeout(() => {
            canSpawn2 = true;
            canIncrease1 = true;
        }, 10000);
        // helps secure that this one will stop - just extra safety
        if (canSpawn2 && canIncrease1) {
            canSpawn1 = false;
        }
    }
    // stage 2, all the same with a different genRate
    if (canSpawn2 && canIncrease1 && !canIncrease2) {
        console.log("can spawn2");
        stage = 2;
        words = "Pretty easy, right?";
        spawnEm();
        canSpawn2 = false;
        setTimeout(() => {
            canSpawn2 = true;
        }, genRate2);
        setTimeout(() => {
            canSpawn3 = true;
            canIncrease2 = true;
        }, 10000);
        if (canSpawn3 && canIncrease2) {
            canSpawn2 = false;
        }
    }
    // stage 3, all the same with a different genRate
    if (canSpawn3 && canIncrease2 && !canIncrease3) {
        console.log("can spawn3");
        stage = 3;
        words = "Bro, turn it up, this isn't fun.";
        spawnEm();
        canSpawn3 = false;
        setTimeout(() => {
            canSpawn3 = true;
        }, genRate3);
        setTimeout(() => {
            canSpawn4 = true;
            canIncrease3 = true;
        }, 10000);
        if (canSpawn4 && canIncrease3) {
            canSpawn3 = false;
        }
    }
    // stage 4, all the same with a different genRate
    if (canSpawn4 && canIncrease3 && !canIncrease4) {
        console.log("can spawn4");
        stage = 4;
        words = "This is actually weak.";
        spawnEm();
        canSpawn4 = false;
        setTimeout(() => {
            canSpawn4 = true;
        }, genRate4);
        setTimeout(() => {
            canSpawn5 = true;
            canIncrease4 = true;
        }, 15000);
        if (canSpawn5 && canIncrease4) {
            canSpawn4 = false;
        }
    }
    // stage 5, all the same with a different genRate
    if (canSpawn5 && canIncrease4 && !canIncrease5) {
        console.log("can spawn5");
        stage = 5;
        words = "Yo, cill out dude.";
        spawnEm();
        canSpawn5 = false;
        setTimeout(() => {
            canSpawn5 = true;
        }, genRate5);
        setTimeout(() => {
            canSpawn6 = true;
            canIncrease5 = true;
        }, 12000);
        if (canSpawn6 && canIncrease5) {
            canSpawn5 = false;
        }
    }
    // stage 6, all the same with a different genRate
    if (canSpawn6 && canIncrease5 && !canIncrease6) {
        console.log("can spawn6");
        stage = 6;
        words = "S***, this is getting harder.";
        spawnEm();
        canSpawn6 = false;
        setTimeout(() => {
            canSpawn6 = true;
        }, genRate6);
        setTimeout(() => {
            canSpawn7 = true;
            canIncrease6 = true;
        }, 15000);
        if (canSpawn7 && canIncrease6) {
            canSpawn6 = false;
        }
    }
    // stage 7... THE INFINITE STAGE BABBYYYY
    // one this starts, it will not stop
    if (canSpawn7 && canIncrease6 && !canIncrease7) {
        console.log("can spawn7");
        stage = "Infinite";
        words = "F***! Have fun ;)"
        spawnEm();
        canSpawn7 = false;
        setTimeout(() => {
            canSpawn7 = true;
        }, genRate7);
    }
    // update the player so he can move
    player1.update();
    // when the player and enemy collides, gamePlaying will be false, stopping the timer
    // also, the enemy and player will be spliced
    for (e of enemies) {
        if (player1.collideWith(e, 0)) {
            console.log('player collided with enemy...');
            gamePlaying = false;
            e.alive = false;
            player1.alive = false;
            player1.spliced = true;
            e.spliced = true;
            e.update();
        }
        e.update();
    }
    // for some reason, becuase I already used this in the enemy class, when I use it again here...
    // it makes the enemies start off fast than slow down fast, which makes an effect I like
    e.x += e.vx * e.speed;

    // allows us to remove enemies and sprites
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
    // allows us to draw the text we have been generating on the screen
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "FPS: " + fps, 140, 20);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "Timer: " + currentTimer, 280, 20);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", "Stage: " + stage, 420, 20);
    drawText(0, 0, 0, 1, "32px Helvetica", "left", "top", " " + words, 640, 20);
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// from Mr. Cozort
// not 100% sure how it works
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
// will repeat over and over and houses all of the needed components for the game to run
// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    now = performance.now();
    let delta = now - then;
    fps = (Math.ceil(1000 / delta));
    totaltime = now - then;
    then = now;
    if (timerStarted && gamePlaying) {
        console.log('timer has stared...');
        timer();
    }
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}