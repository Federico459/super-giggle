import { AnimatedSprite, Container, Graphics, Texture ,Text, NineSlicePlane} from "pixi.js";
import { HomeroSombrero } from "../objects/HomeroSombrero";
import { Mago } from "../objects/Mago";

export class Scene extends Container{
    constructor(){
        super();
        const homeroWithSombreros: HomeroSombrero = new HomeroSombrero();
        homeroWithSombreros.position.set(800,100);
        homeroWithSombreros.scale.set(0.4);
        this.addChild(homeroWithSombreros);

        const mago: Mago = new Mago();
        this.addChild(mago);


        const magoAnimated: AnimatedSprite = new AnimatedSprite(
            [
                Texture.from("caminar01"),
                Texture.from("caminar02"),
                Texture.from("caminar03"),
                Texture.from("caminar04"),
                Texture.from("caminar05")
            ],true
        );
        magoAnimated.play();
        magoAnimated.animationSpeed = 0.3;
        this.addChild(magoAnimated);

        const myGraph: Graphics = new Graphics();
        myGraph.lineStyle({color: 0xFF00FF, width: 10, alpha:1});
        myGraph.moveTo(0,0);
        myGraph.lineTo(300,500);
        myGraph.lineTo(300,100);
        myGraph.lineTo(0,0);
        myGraph.clear();

        myGraph.lineStyle({color: 0xFF00FF, width: 10, alpha:1});
        myGraph.beginFill(0x00FF00);
        myGraph.drawCircle(0,0,100);
        myGraph.endFill();
        myGraph.drawCircle(50,50,100);
        myGraph.position.set(640,360);
        this.addChild(myGraph);

        const myText: Text = new Text("holu",{fontSize: 42, fill: 0xFF000, fontFamily: "Comic Sans MS"});
        myText.text = "esaaaaaaaaaaaaaaa!";
        myText.position.x = 500;
        myText.position.y = 100;
        myText.angle = 75
        
        this.addChild(myText);

        const panel = new NineSlicePlane(
            Texture.from("loseta"),
            35,35,35,35
        );
        panel.scale.set(0.5);
        this.addChild(panel);

    };
};