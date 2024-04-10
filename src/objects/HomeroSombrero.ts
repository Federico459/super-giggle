import { Container, Sprite } from "pixi.js";

export class HomeroSombrero extends Container{
    constructor(){
        super();
        const homero: Sprite = Sprite.from("homero");
        const sombrero: Sprite = Sprite.from("sombrero");
        const sombrero2: Sprite = Sprite.from("sombrero");
        sombrero.position.set(365,-15);
        sombrero2.scale.set(0.6);
        sombrero2.angle = 180;
        sombrero2.position.set(300,350);

        this.addChild(homero);
        this.addChild(sombrero);
        this.addChild(sombrero2);
    }
};