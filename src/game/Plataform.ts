import { Container, Graphics, Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Platform extends Container implements IHitbox{
    private hitBox: Graphics;
    constructor(){
        super();
        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFF0000,0.6);
        this.hitBox.drawRect(0,0,300,25);
        this.hitBox.endFill();
        this.addChild(this.hitBox);
    }

    public getHitbox():Rectangle{
        return this.hitBox.getBounds();
    }
}