import { Container, TextStyle, Text, Graphics } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";

export class Menu extends Container implements IUpdateable{

    private world:Container;

    constructor(){
        super();

        this.world = new Container();

        const myGraph: Graphics = new Graphics();
        myGraph.lineStyle({color: 0x550055, width: 10, alpha:1});
        myGraph.beginFill(0x000000);
        myGraph.moveTo(0,0);
        myGraph.lineTo(0,1080);
        myGraph.lineTo(1920,1080);
        myGraph.lineTo(1920,0);
        myGraph.lineTo(0,0);
        myGraph.endFill();
        this.world.addChild(myGraph);

        const tStyle = new TextStyle({
            fontSize: 70,
            dropShadow: true,
            fill: "blue",
            lineJoin: "round",
            stroke: "#15be09",
            strokeThickness: 20,
            fontFamily: "Comic Sans MS"
        });
        const t = new Text("Probando",tStyle);
        this.world.addChild(t);

        this.addChild(this.world);


    }
    
    public update(_deltaFrame: number, _deltaTime: number): void { // _deltaTime?: number | undefined
        //this.playerMago.update(deltaTime);


    };
};