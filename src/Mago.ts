import { Container, Sprite } from "pixi.js";

export class Mago extends Container{
    constructor(){
        super();
        const parado: Sprite = Sprite.from("parado01");
        const sombrero: Sprite = Sprite.from("sombrero");
        parado.position.set(-20,50);
        sombrero.position.set(10,0);
        sombrero.scale.set(0.6);
        this.addChild(parado);
        this.addChild(sombrero);

    }
};