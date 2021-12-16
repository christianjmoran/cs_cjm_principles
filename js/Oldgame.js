// global variables
let canvas;
let ctx;
let TILESIZE = 64;
let WIDTH = TILESIZE * 22;
let HEIGHT = TILESIZE * 9;
let allSprites = [];
let walls = [];
let enemies = [];

// get user input from keyboard
let keysDown = {};
let keysUp = {};

// map of where we want to put sprites
let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;

// always listening for when a key is pressed, then outputting true so that we can move the player (adds it to array)
addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    // rrconsole.log("key down is " + keysDown[event.key]);
}, false);

// listening for when the key is let go to stop player (deletes it from array to clean it out)
addEventListener("keyup", function (event) {
    // keysUp[event.key] = true;
    delete keysDown[event.key];
}, false);

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

// da main class g
class Sprite {
    constructor(x, y, w, h, color) {
        // dimentions of boxes
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        // creates an array of values associated with the sprite
        allSprites.push(this);
    }
    // makes sprites strings
    get type() {
        return "sprite";
    }
    // makes da sprite
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    // draw it on the canvas
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

// wall is a subclass of speite
class Wall extends Sprite {
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    create(x, y, w, h, color) {
        return new Wall(x, y, w, h, color);
    }
    get type() {
        return "wall";
    }
}

// player is the other subclass
class Player extends Sprite {
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        // how many pixels it moves per a certain amount of time
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }
    // if player touches an object, it returns true
    collideWith(obj) {
        if (this.x + this.w > obj.x &&
            this.x < obj.x + obj.w &&
            this.y + this.h > obj.y &&
            this.y < obj.y + obj.h) {
            console.log('collides with ' + obj.type);
            return true;
        }
    }
    jump() {
        this.vy = -this.jumpPower;
        this.canJump = false;
        
    }
    get type() {
        return "player";
    }
    // takes outputs from event listeners to change dirrection of player
    input() {
        if ('w' in keysDown) {
            this.vx = 0;
            this.dx = 0;
            this.dy = -1;
            this.vy = this.speed * this.dy;
            // make sure you clear the dirrection to avoid bugs
            console.log("dy is: " + this.dy)
            this.y -= -this.vy;
        }
        if ('a' in keysDown) {
            this.vy = 0;
            this.dy = 0;
            this.dx = -1;
            this.vx = this.speed * this.dx;
            // console.log("dx is: " + this.dx)
            this.x -= -this.vx;
        }
        if ('s' in keysDown) {
            this.dx = 0;
            this.vx = 0;
            this.dy = 1;
            this.xy = this.speed * this.dy;
            // console.log("dy is: " + this.dy)
            this.y += -this.vy;

        }
        if ('d' in keysDown) {
            this.dx = 0;
            this.vx = 0;
            this.dx = 1;
            this.vx = this.speed * this.dx;
            // console.log("dx is: " + this.dx)
            this.x += -this.vx;
        }

    }
    // constantly running to see of it colides and then to recoil back 
    update() {
        this.input();
        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
            this.dx = 0;
        }
        if (this.x < 0) {
            this.x = 0;
            this.dx = 0;
        }
        if (this.y + this.h > HEIGHT) {
            this.y = HEIGHT - this.h;
            this.dy = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.dy = 0;
        }
    };
}

class Enemy extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "blue";
        enemies.push(this);
    }
    collideWith(obj) {
        if (this.x + this.w > obj.x &&
            this.x < obj.x + obj.w &&
            this.y + this.h > obj.y &&
            this.y < obj.y + obj.h
        ) {
            console.log('collides with ' + obj);
            return true;
        }
    }
    create(x, y, w, h) {
        return new Enemy(x, y, w, h);
    }
    get type() {
        return "enemy";
    }
    update() {
        this.x += 1;
    }
}

//defining what means what in the gamePlan
const levelChars = {
    ".": "empty",
    "#": Wall,
};

// makes a 2d array (grid) that pushes x values in a row array. Once it hits the end, it pushes that array into another, and clears it for the next row. Makes the grid.
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
                    let t = new type;
                    // let id = Math.floor(100*Math.random());
                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}

// make the grid REAL
let currentLevel = readLevel(makeGrid(gamePlan, 22))
console.log('current level');
console.log(currentLevel);

// instantiations...
let player1 = new Player(WIDTH / 3, HEIGHT / 3, 10, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);
// let oneSquare = new Square("Bob", 10, 10, 1, 50, 50, 'rgb(200, 100, 200)');
// let twoSquare = new Square("Chuck", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
// let threeSquare = new Square("Bill", 70, 70, 3, 25, 25, 'rgb(100, 100, 222)');

console.log(allSprites);
console.log(walls);


// universal update used to update player and colisions
function update() {
    for (i of allSprites) {
        if (i.type == "wall") {
            // console.log(i)
            if (player1.collideWith(i)) {
                player.x -= this.vx
                // console.log("player collided with walls");
                // if (player1.dx == 1) {
                //     player1.dx = 0;
                //     player1.x = i.x - player1.w;
                // }
                // else if (player1.dy == 1) {
                //     player1.dy = 0;
                //     player1.y = i.y - player1.h;
                // }
                // else if (player1.dx == -1) {
                //     player1.dx = 0;
                //     player1.x = i.x + i.w;
                // }
                // else if (player1.dy == -1) {
                //     player1.dy = 0;
                //     player1.y = i.y + i.h;
                // }
            }
        }
    }
    for (e of enemies) {
        e.update();
    }
    player1.update();

    // oneSquare.update();
    // twoSquare.update();
}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}