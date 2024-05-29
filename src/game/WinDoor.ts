import { Container, Graphics, Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class WinDoor extends Container implements IHitbox{
    private hitBox: Graphics;

    constructor(){
        super();
        this.hitBox = new Graphics();
        this.hitBox.beginFill(0x6D3904,0.5);
        this.hitBox.drawRect(0,0,150,150);
        this.hitBox.endFill();
        this.hitBox.beginFill(0x160C02,0.5);
        this.hitBox.drawRect(65,0,20,150);
        this.hitBox.endFill();
        this.hitBox.beginFill(0x160C02,0.5);
        this.hitBox.drawCircle(50,85,10);
        this.hitBox.endFill();
        this.hitBox.beginFill(0x160C02,0.5);
        this.hitBox.drawCircle(100,85,10);
        this.hitBox.endFill();
        this.addChild(this.hitBox);
    }

    public getHitbox():Rectangle{
        return this.hitBox.getBounds();
    }
}