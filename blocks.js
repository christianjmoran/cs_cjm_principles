function collideWith(obj) {
    if (this.x + this.w > obj.x &&
        this.x < obj.x + obj.w &&
        this.y + this.h > obj.y &&
        this.y < obj.y + obj.h) {
            console.log('collides with ' + obj);
            return true;
        }
}

class Wall extends Sprite{
    constructor(x, y, w, h, color){
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
    get type(){
        return "wall";
    }
}
