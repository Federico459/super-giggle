import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { HEIGHT, WIDTH } from "..";
import { IHitbox } from "./IHitbox";
import { sound } from "@pixi/sound";

export class Player extends PhysicsContainer implements IHitbox{

    private magoAnimated: AnimatedSprite;
    private hitBox: Graphics;
    private static readonly GRAVITY = 350;
    private static readonly MOVE_SPEED = 350;
    public canJump = true;

    constructor(){
        super();
        this.magoAnimated = new AnimatedSprite(
            [
                Texture.from("caminar01"),
                Texture.from("caminar02"),
                Texture.from("caminar03"),
                Texture.from("caminar04"),
                Texture.from("caminar05")
            ],false
        );
        this.magoAnimated.play();
        
        this.magoAnimated.position.set(this.magoAnimated.width/2,this.magoAnimated.height/2);
        this.magoAnimated.anchor.set(0.5);
        this.magoAnimated.animationSpeed = 0.009;

        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0,0,10);
        auxZero.endFill();

        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFF00FF,0.3);
        this.hitBox.drawRect(0,0,this.magoAnimated.width,this.magoAnimated.height);
        this.hitBox.endFill();

        this.addChild(this.magoAnimated);
        this.addChild(auxZero);
        this.addChild(this.hitBox);
        
        this.position.set(WIDTH/4,HEIGHT/2);

        this.acceleration.y = Player.GRAVITY;

        Keyboard.down.on("ArrowUp", this.jump, this);

    }

    public override destroy(options?: any): void {
        super.destroy(options);
        Keyboard.down.off("ArrowUp", this.jump);
    }

    public override update(deltaMS: number): void {
        super.update(deltaMS/1000);
        this.magoAnimated.update(deltaMS);

        if(Keyboard.state.get("ArrowRight")){
            if(this.scale.x == -1){
                this.position.x -= this.height/2;
                this.scale.x = 1;
            }
            this.speed.x = Player.MOVE_SPEED;
        } else if(Keyboard.state.get("ArrowLeft")){
            if(this.scale.x == 1){
                this.position.x += this.height/2;
                this.scale.x = -1;
            }
            this.speed.x = -Player.MOVE_SPEED;
        } else {
            this.speed.x = 0;
        }

        if(Keyboard.state.get("ArrowDown")){
            this.acceleration.y = Player.GRAVITY * 4;
        }  else {
            this.acceleration.y = Player.GRAVITY;
        }
    }

    private jump(){
        if(this.canJump){
            sound.play("salto01");
            this.canJump = false;
            this.speed.y = -Player.MOVE_SPEED*1.2;
        }
    }

    public getHitbox():Rectangle{
        return this.hitBox.getBounds();
    }

}