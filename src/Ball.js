import { detectCollision } from "./collisionDetection.js";
import {clampBallAngle} from "./ClampBallAngle.js"

export default class Ball{
    constructor(game){
        this.img = document.getElementById("img_ball");
        this.size = 16;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.reset();
    }

    reset(){
        this.position={x: 10, y: 300}
        this.speed = {x: 4, y: -4}
    }

    draw(ctx){
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size, this.size)
    }

    update(deltaTime){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //check for collisions with side walls
        if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        //check for collision with top wall
        if(this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        //check for collision with bottom wall
        if(this.position.y + this.size > this.gameHeight ){
            this.game.lives--;
            this.reset();
        }

        //check for collisions with paddle
        if(detectCollision(this, this.game.paddle)){

            console.log(this.game.padle.y)

            let hitSpeed = Math.sqrt( Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));

            let newAngle = (
            -(this.position.x  +- this.game.paddle.position.x) * 60
             ) + 90;
            newAngle = clampBallAngle(newAngle);

            this.speed.y = Math.sin(newAngle) * hitSpeed;
            this.speed.x = Math.cos(newAngle) * hitSpeed;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}