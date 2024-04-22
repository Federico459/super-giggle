import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { WIDTH } from "..";
import { IHitbox } from "./IHitbox";
import { sound } from "@pixi/sound";

export class Player01 extends PhysicsContainer implements IHitbox{

    private hatAnimated: AnimatedSprite;
    private hitBox: Graphics;
    private static readonly GRAVITY = 350;
    private static readonly MOVE_SPEED = 350;
    public canJump = true;

    constructor(){
        super();
        this.hatAnimated = new AnimatedSprite(
            [
                Texture.from("hat1"),
                Texture.from("hat2"),
                Texture.from("hat3"),
                Texture.from("hat4"),
                Texture.from("hat3"),
                Texture.from("hat2")
            ],false
        );
        this.hatAnimated.play();
        this.hatAnimated.position.set(0,0);
        //this.hatAnimated.anchor.set(0.5);
        this.hatAnimated.animationSpeed = 0.009;

        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFF00FF,0.3);
        //this.hitBox.drawRect(0,0,this.hatAnimated.width,this.hatAnimated.height);
        this.hitBox.drawCircle(this.hatAnimated.width/2,this.hatAnimated.width/2,this.hatAnimated.width/2);
        this.hitBox.endFill();

        this.addChild(this.hatAnimated);
        this.addChild(this.hitBox);

        this.acceleration.y = Player01.GRAVITY;
        Keyboard.down.on("ArrowUp", this.jump, this);
        
        this.position.set(0,WIDTH);
    }

    public override destroy(options?: any): void {
        super.destroy(options);
        Keyboard.down.off("ArrowUp", this.jump);
    }

    public override update(deltaMS: number): void {
        super.update(deltaMS/1000);
        this.hatAnimated.update(deltaMS);

        if(Keyboard.state.get("ArrowRight")){
            if(this.scale.x == -1){
                this.position.x -= this.height;
                this.scale.x = 1;
            }
            this.speed.x = Player01.MOVE_SPEED;
        } else if(Keyboard.state.get("ArrowLeft")){
            if(this.scale.x == 1){
                this.position.x += this.height;
                this.scale.x = -1;
            }
            this.speed.x = -Player01.MOVE_SPEED;
        } else {
            this.speed.x = 0;
        }
        /*
        // modo volar ?
        if(Keyboard.state.get("ArrowDown")){
            this.speed.y = Player01.MOVE_SPEED;
        } else if(Keyboard.state.get("ArrowUp")){
            this.speed.y = -Player01.MOVE_SPEED;
        } else {
            this.speed.y = 0;
        }*/

        if(Keyboard.state.get("ArrowDown")){
            this.acceleration.y = Player01.GRAVITY * 4;
        }  else {
            this.acceleration.y = Player01.GRAVITY;
        }

    }

    private jump(){
        if(this.canJump){
            sound.play("salto01");
            this.canJump = false;
            this.speed.y = -Player01.MOVE_SPEED*1.2;
        }
    }

    public getHitbox():Rectangle{
        return this.hitBox.getBounds();
    }

}