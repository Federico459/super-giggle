import { Container, Graphics, Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Coin extends Container implements IHitbox{
    private hitBox: Graphics;
    constructor(){
        super();
        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFFFB00,0.7);
        this.hitBox.drawCircle(0,0,15);

        this.hitBox.endFill();
        this.addChild(this.hitBox);
    }

    public getHitbox():Rectangle{
        return this.hitBox.getBounds();
    }
}