import InputHandler from "./InputHandler.js";
import Ball from "./Ball.js";
import Paddle from "./Paddle.js"
import Brick from "./Brick.js"
import {buildLevel, level1} from "./levels.js"

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.gameObjects = [];
        this.bricks = [];
        new InputHandler(this.paddle, this);
        this.lives = 3;
    }

    start(){  
        if(this.gamestate != GAMESTATE.MENU) return;

        this.bricks = buildLevel(this, level1)

        this.gameObjects = [
            this.ball,
            this.paddle,
        ]
        
        this.gamestate = GAMESTATE.RUNNING;
        
    }

    update(deltaTime){

        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if(this.gamestate != GAMESTATE.RUNNING) return;

        if(this.bricks.length === 0){
            console.log("new level")
        }

        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion)
    }

    draw(ctx){
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        if(this.gamestate == GAMESTATE.PAUSED){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2)
        }

        if(this.gamestate === GAMESTATE.MENU){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press space to start", this.gameWidth / 2, this.gameHeight / 2)
        }

        if(this.gamestate === GAMESTATE.GAMEOVER){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2)
        }
        
    }

    togglePause(){
        console.log("pause!")
        if(this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        }else{
            this.gamestate = GAMESTATE.PAUSED;
        }

    }
}