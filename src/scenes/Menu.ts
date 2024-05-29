import { Container, TextStyle, Text, Graphics } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { HEIGHT, WIDTH } from "..";
import { SceneManager } from "../utils/SceneManager";
import { Game } from "./Game";
import { SceneBase } from "../utils/SceneBase";

export class Menu extends SceneBase implements IUpdateable{

    private world:Container;
    public opt = 1;
    public optMax = 2;

    public m1Style = new TextStyle({
        fontSize: 80,
        dropShadow: true,
        fill: "#0075B6",
        lineJoin: "round",
        stroke: "#15be09",
        strokeThickness: 12,
        fontFamily: "Comic Sans MS"
    });

    public m2Style = new TextStyle({
        fontSize: 80,
        dropShadow: true,
        fill: "#0075B6",
        lineJoin: "round",
        stroke: "",
        strokeThickness: 12,
        fontFamily: "Comic Sans MS"
    });

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
        const t = new Text("Sombrerito",tStyle);
        t.position.set(WIDTH/2-t.width/2,HEIGHT/12);
        this.world.addChild(t);

        const m1 = new Text("Empezar",this.m1Style);
        m1.position.set(WIDTH/2-m1.width/2,HEIGHT/3);
        this.world.addChild(m1);

        const m2 = new Text("Niveles",this.m2Style);
        m2.position.set(WIDTH/2-m2.width/2,HEIGHT/2);
        this.world.addChild(m2);

        document.addEventListener("keyup",this.onKeyUp.bind(this));

        this.addChild(this.world);
    }

    private onKeyUp(e: KeyboardEvent):void{
        //console.log("tecla => " + e.code);
        if(e.code == "Enter"){
            if(this.opt == 1){
                this.opt = 0;
                const myScene = new Game();
                //SceneManager.initialize();
                SceneManager.changeScene(myScene);
                this.world.destroy();
                document.removeEventListener("keyup",this.onKeyUp.bind(this));
                /*const game = new Game();
                app.stage.removeChildren
	            app.stage.addChild(game);
                console.log("oo " + app.stage.children.length)*/
            }
        }if(e.code == "Escape"){
            this.opt = 1;
        }
        if(e.code == "ArrowUp"){
            //console.log("this.opt "+this.opt)
            this.opt = 1;
            if(this.opt == 1){
                this.m1Style.stroke = "#15be09";
                this.m2Style.stroke = "";
            }
            if(this.opt == 2){
                this.m1Style.stroke = "";
                    this.m2Style.stroke = "#15be09";
            }

        }
        if(e.code == "ArrowDown"){
            //console.log("this.opt"+this.opt)
            this.opt = 2;
            if(this.opt == 1){
                this.m1Style.stroke = "#15be09";
                this.m2Style.stroke = "";
            }
            if(this.opt == 2){
                this.m1Style.stroke = "";
                    this.m2Style.stroke = "#15be09";
            }
        }
    }
    
    public update(_deltaFrame: number, _deltaTime: number): void { // _deltaTime?: number | undefined
        //console.log("menu: _deltaFrame "+_deltaFrame+", _deltaTime" + _deltaTime);

    };

    public dibujarMenu(_opt: number):void{

    }
};