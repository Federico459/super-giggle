import { Container, TextStyle, Text, Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { HEIGHT, WIDTH } from "..";
import { Player } from "../game/Player";
import { Platform } from "../game/Plataform";
import { checkCollision } from "../game/IHitbox";

export class Caminando extends Container implements IUpdateable{

    private playerMago: Player;
    private platforms: Platform[];
    private plataform01: Platform;
    private plataform02: Platform;
    private world:Container;
    private background: TilingSprite;

    constructor(){
        super();

        this.world = new Container();
        this.background = new TilingSprite(Texture.from("Background"),WIDTH*3,HEIGHT);
        this.addChild(this.background);
        //this.world.addChild(this.background);

        const tStyle = new TextStyle({
            fontSize: 100,
            dropShadow: true,
            fill: "blue",
            lineJoin: "round",
            stroke: "#15be09",
            strokeThickness: 20,
            fontFamily: "Comic Sans MS"
        });
        const t = new Text("JUEGUITO",tStyle);
        this.addChild(t);

        this.playerMago = new Player();
        this.world.addChild(this.playerMago);

        this.platforms = [];

        this.plataform01 = new Platform();
        this.plataform01.position.set(700,550);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(1000,550);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(1350,100);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(1600,300);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(2100,550);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(2200,0);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(3100,100);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform01 = new Platform();
        this.plataform01.position.set(3400,100);
        this.platforms.push(this.plataform01);
        this.world.addChild(this.plataform01);

        this.plataform02 = new Platform();
        this.plataform02.position.set(0,300);
        this.platforms.push(this.plataform02);
        this.world.addChild(this.plataform02);

        this.addChild(this.world);

        //this.world.x = -this.playerMago.x * this.worldTransform.a + WIDTH/4;
        //this.background.tilePosition.x = this.world.x;
    }
    
    public update(_deltaFrame: number, deltaTime: number): void { // _deltaTime?: number | undefined
        this.playerMago.update(deltaTime);

        for (const platform of this.platforms) {
            const overlap = checkCollision(this.playerMago, platform);
            if(overlap != null){
                if(overlap.width < overlap.height){
                    if(this.playerMago.x > platform.x){
                        this.playerMago.x += overlap.width;
                    } else if (this.playerMago.x < platform.x) {
                        this.playerMago.x -= overlap.width;
                    }
                } else {
                    if(this.playerMago.y + this.playerMago.height > platform.y 
                        && this.playerMago.y < platform.y 
                        && this.playerMago.speed.y > 0){
                        this.playerMago.y -= overlap.height;
                        this.playerMago.speed.y = 0;
                        this.playerMago.canJump = true;
                    } else if (this.playerMago.y < platform.y + platform.height
                        && this.playerMago.y > platform.y
                        && this.playerMago.speed.y < 0) {
                        this.playerMago.y += overlap.height;
                        this.playerMago.speed.y = 0;
                    }
                }
            }

            if(this.playerMago.width>0){
                this.world.x = -this.playerMago.x * this.worldTransform.a + WIDTH/4;
            } else {
                this.world.x = -this.playerMago.width -this.playerMago.x * this.worldTransform.a + WIDTH/4;
            }
            
        }
        
        if(this.playerMago.x+this.playerMago.width>WIDTH*3){
            this.playerMago.x = WIDTH*3-this.playerMago.width;
        }
        if(this.playerMago.x + this.playerMago.width <0){//al invertirse el sprite se invierte el valor del width
            this.playerMago.x = -this.playerMago.width;
        }

        if(this.playerMago.y+this.playerMago.height>HEIGHT){
            this.playerMago.y = HEIGHT-this.playerMago.height;
            this.playerMago.canJump = true;
        }

        this.background.tilePosition.x = this.world.x;
    };
};