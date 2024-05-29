import { Ticker } from "pixi.js";
import { app } from "..";
import { SceneBase } from "./SceneBase";

export namespace SceneManager{

    let currentScene:SceneBase; 
    export function initialize(){
        window.dispatchEvent(new Event("resize"));
        Ticker.shared.add(update)
    }
    export function changeScene(newScene: SceneBase){
        if (currentScene){
            currentScene.destroy();
        }
        currentScene=newScene
        app.stage.addChild(currentScene);
   }

    function update(frames:number){
        //currentScene.update(Ticker.shared.deltaMS, frames);
        //Group.shared.update();
        currentScene?.update(frames, Ticker.shared.deltaMS);
        //currentScene?.update(Ticker.shared.FPS,Ticker.shared.deltaMS);
        
    }
}