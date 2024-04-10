import { Container } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { sound } from "@pixi/sound";

export class SoundScene extends Container implements IUpdateable{

    constructor(){
        super();

        sound.play("salto01");

        const allCont = new Container();
        this.addChild(allCont);
        allCont.scale.set(3);
        /*
        const btnSword = new Button(Texture.from("sombrero"));
        btnSword.position.set(200,200);
        btnSword.on(Button.CLICKED_EVENT, this.swordSound, this);*/
    }
    update(_deltaFrame: number, _deltaTime?: number | undefined): void {
        throw new Error("Method not implemented.");
    }

    public swordSound(){

    }
}