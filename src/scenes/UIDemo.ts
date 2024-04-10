import { Container, Sprite, Texture, Text} from "pixi.js";
import { Button } from "../ui/Button";
import { Pointer } from "../ui/Pointer";
import { Keyboard } from "../utils/Keyboard";

export class UIDemo extends Container{
    private buttonMouse: Button;
    private buttonTouch: Sprite;
    private buttonPointer: Pointer;
    private lastKeyPressed: Text;

    constructor(){
        super();
        const dialog = new Container();
        dialog.x = 50;
        dialog.y = 30;

        const background = Sprite.from("loseta");
        background.scale.set(0.65);
        dialog.addChild(background);
        
        this.buttonMouse = new Button(
            Texture.from("c01"),
            Texture.from("c03"),
            Texture.from("c02"),
            this.onButtonClick.bind(this)
        );
        this.buttonMouse.scale.set(0.3);
        this.buttonMouse.position.set(10,400);

        dialog.addChild(this.buttonMouse);

        this.buttonTouch = Sprite.from("m01");
        this.buttonTouch.scale.set(0.3);
        this.buttonTouch.position.set(140,400);
        this.buttonTouch.on("touchstart", this.onTouchStart,this);
        this.buttonTouch.on("touchend", this.onTouchEnd,this);
        this.buttonTouch.interactive = true;
        dialog.addChild(this.buttonTouch);

        this.buttonPointer = new Pointer(
            Texture.from("mc01"),
            Texture.from("mc03"),
            Texture.from("mc01"),
            this.onButtonClick.bind(this)
        );
        this.buttonPointer.scale.set(0.3);
        this.buttonPointer.position.set(270,400);
        dialog.addChild(this.buttonPointer);

        this.lastKeyPressed = new Text("Waiting...", {fontSize: 48});
        this.lastKeyPressed.anchor.set(0.5);
        this.lastKeyPressed.x = (background.width ) / 2;
        this.lastKeyPressed.y = this.buttonPointer.y + 175;
        dialog.addChild(this.lastKeyPressed);

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

        this.addChild(dialog);

        Keyboard.down.on("KeyB",this.onKeyB,this);
        Keyboard.up.on("KeyB",this.onKeyBup,this);
    }

    private onKeyB(): void{
        console.log("apretelaB",this);
    }

    private onKeyBup(): void{
        console.log("soltelab",this);
    }

    private onKeyDown(e:KeyboardEvent):void{
        this.lastKeyPressed.text = e.code;
    }

    private onKeyUp(e:KeyboardEvent):void{
        this.lastKeyPressed.text = e.code;
    }

    private onButtonClick():void{
        console.log("click?",Keyboard.state.get("KeyA"));
        if(Keyboard.state.get("KeyA")){
            this.lastKeyPressed.text = "SIUUUU!!";
        }
    }

    private onTouchStart():void{
        this.buttonTouch.texture = Texture.from("m03");
    }

    private onTouchEnd():void{
        this.buttonTouch.texture = Texture.from("m01");
    }
};