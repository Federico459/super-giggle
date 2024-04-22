import { Container, Graphics } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { HEIGHT, WIDTH } from "..";
import { Player01 } from "../game/Player01";
import { Platform } from "../game/Plataform";
import { checkCollision } from "../game/IHitbox";

export class Game extends Container implements IUpdateable{

    private world:Container;
    private player1: Player01;
    private platforms: Platform[];
    private plataform01: Platform;

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

        this.player1 = new Player01();
        this.world.addChild(this.player1);

        this.platforms = [];

        this.plataform01 = new Platform();
        this.plataform01.position.set(0,450);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(850,300);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(850,650);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(1350,200);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(1620,850);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.addChild(this.world);
    }
    
    public update(_deltaFrame: number, deltaTime: number): void { // _deltaTime?: number | undefined
        this.player1.update(deltaTime);

        for (const platform of this.platforms) {
            const overlap = checkCollision(this.player1, platform);
            if(overlap != null){
                if(overlap.width < overlap.height){
                    if(this.player1.x > platform.x){
                        this.player1.x += overlap.width;
                    } else if (this.player1.x < platform.x) {
                        this.player1.x -= overlap.width;
                    }
                } else {
                    if(this.player1.y + this.player1.height > platform.y 
                        && this.player1.y < platform.y 
                        && this.player1.speed.y > 0){
                        this.player1.y -= overlap.height;
                        this.player1.speed.y = 0;
                        this.player1.canJump = true;
                    } else if (this.player1.y < platform.y + platform.height
                        && this.player1.y > platform.y
                        && this.player1.speed.y < 0) {
                        this.player1.y += overlap.height;
                        this.player1.speed.y = 0;
                    }
                }
            }

            if(this.player1.width>0){
                this.world.x = -this.player1.x * this.worldTransform.a + WIDTH/4;
            } else {
                this.world.x = -this.player1.width -this.player1.x * this.worldTransform.a + WIDTH/4;
            }
            
        }
        
        if(this.player1.x + this.player1.width > WIDTH){
            this.player1.x = WIDTH-this.player1.width;
        }
        if(this.player1.x + this.player1.width < 0){//al invertirse el sprite se invierte el valor del width
            this.player1.x = -this.player1.width;
        }

        if(this.player1.y + this.player1.height > HEIGHT){
            this.player1.canJump = true;
            this.player1.y = HEIGHT-this.player1.height;
        }

        if(this.player1.y < 0){
            this.player1.y = 0;
        }

    };
};