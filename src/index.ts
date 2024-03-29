import { Application, Loader} from 'pixi.js'
import { assets } from './assets';
import { Scene } from './Scene';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});

window.addEventListener("resize",()=>{
	console.log("rezize!");
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX,scaleY);
	const gameWidth = Math.floor(app.screen.width * scale);
	const gameHeight = Math.floor(app.screen.height * scale);

	const marginHorizontal = Math.floor((window.innerWidth - gameWidth)/2);
	const marginVertical = Math.floor((window.innerHeight - gameHeight)/2);

	app.view.style.width = gameWidth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = marginHorizontal.toString() + "px";
	app.view.style.marginRight = marginHorizontal.toString() + "px";

	app.view.style.marginTop = marginVertical.toString() + "px";
	app.view.style.marginBottom = marginVertical.toString() + "px";

});
window.dispatchEvent(new Event("resize"));

Loader.shared.add(assets);
Loader.shared.onComplete.add(()=>{
	const myScene = new Scene();
	app.stage.addChild(myScene);
});
Loader.shared.load();