import { Container, Graphics } from "pixi.js";

export class UIContainer extends Container{
    constructor(){
        super();
        const myGraph: Graphics = new Graphics();
        myGraph.lineStyle({color: 0xFF00AA, width: 10, alpha:1});
        myGraph.beginFill(0xFFA000);
        myGraph.moveTo(0,0);
        myGraph.lineTo(0,600);
        myGraph.lineTo(450,600);
        myGraph.lineTo(450,0);
        myGraph.lineTo(0,0);
        myGraph.endFill();
        this.addChild(myGraph);
    }
};