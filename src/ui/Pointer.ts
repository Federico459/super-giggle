import { Container, Sprite, Texture } from "pixi.js";

export class Pointer extends Container{

    private def:Texture;    
    private down:Texture;
    private over:Texture;
    private callback:Function;

    private spr:Sprite;

    constructor(def:Texture, down: Texture, over:Texture, callback:Function){
        super();
        this.def = def;
        this.down = down;
        this.over = over;
        this.callback = callback;

        this.spr = Sprite.from(def);
        this.addChild(this.spr);

        this.spr.interactive = true;
        this.spr.on("pointerdown", this.onPointerDown,this);
        this.spr.on("pointerup", this.onPointerUp,this);
        this.spr.on("pointerover", this.onPointerOver,this);
        this.spr.on("pointerout", this.onPointerOut,this);
    }

    private onPointerDown():void{
        this.spr.texture = this.down;
    }

    private onPointerUp():void{
        this.callback();
        this.spr.texture = this.over;
    }

    private onPointerOver():void{
        this.spr.texture = this.over;
    }

    private onPointerOut():void{
        this.spr.texture = this.def;
    }
}