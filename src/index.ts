import { Application, Loader, Ticker} from 'pixi.js'
import { assets } from './assets';
import { Keyboard } from './utils/Keyboard';
import { Game } from './scenes/Game';

export const WIDTH = 1920;
export const HEIGHT = 1080;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: WIDTH,
	height: HEIGHT
});

Keyboard.initialize();

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
	const game = new Game();
	app.stage.addChild(game);
	Ticker.shared.add(function(){
		game.update(Ticker.shared.FPS,Ticker.shared.deltaMS);
	});
});
Loader.shared.load();