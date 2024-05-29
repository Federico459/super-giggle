import { Container, TextStyle, Text, Graphics } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { HEIGHT, WIDTH } from "..";
import { SceneBase } from "../utils/SceneBase";

export class WinScene extends SceneBase implements IUpdateable{

    private world:Container;

    constructor(){
        super();

        this.world = new Container();

        const myGraph: Graphics = new Graphics();
        myGraph.lineStyle({color: 0x223322, width: 10, alpha:1});
        myGraph.beginFill(0x223322);
        myGraph.moveTo(0,0);
        myGraph.lineTo(0,1080);
        myGraph.lineTo(1920,1080);
        myGraph.lineTo(1920,0);
        myGraph.lineTo(0,0);
        myGraph.endFill();
        this.world.addChild(myGraph);

        const tStyle = new TextStyle({
            fontSize: 120,
            dropShadow: true,
            fill: "#A70101",
            lineJoin: "round",
            stroke: "#CC6400",
            strokeThickness: 20,
            fontFamily: "Comic Sans MS"
        });
        const t = new Text("¡GANASTE!",tStyle);
        t.position.set(WIDTH/2-t.width/2,HEIGHT/3);
        this.world.addChild(t);

        const t2Style = new TextStyle({
            fontSize: 60,
            dropShadow: true,
            fill: "#A70101",
            lineJoin: "round",
            stroke: "#CC6400",
            strokeThickness: 20,
            fontFamily: "Comic Sans MS"
        });
        const t2 = new Text("=> Jugar denuevo <=",t2Style);
        t2.position.set(WIDTH/2-t2.width/2,HEIGHT*3/4);
        this.world.addChild(t2);

        document.addEventListener("keyup",this.onKeyUp.bind(this));

        this.addChild(this.world);

    }

    private onKeyUp(_e: KeyboardEvent):void{
        //console.log("tecla => " + e.code);
        
    }
    
    public update(_deltaFrame: number, _deltaTime: number): void { // _deltaTime?: number | undefined
        //console.log("menu: _deltaFrame "+_deltaFrame+", _deltaTime" + _deltaTime);

    };

    public dibujarMenu(_opt: number):void{

    }
};