import Game from './src/Game.js';
import View from './src/view.js';

const element = document.querySelector('#root');

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game; // получить доступ к объекту game, т.к. мы исполь. модули константы не поподают в группу глобальных пространства имен
window.view = view;

document.addEventListener('keydown', event => {
	switch (event.keyCode) {
		case 37: // LEFT ARROW
			game.movePieceLeft();
			view.render(game.getState());
			break;
		case 38: // UP ARROW
			game.rotatePiece();
			view.render(game.getState());
			break;
		case 39: // RIGHT ARROW
			game.movePieceRight();
			view.render(game.getState());
			break;
		case 40: // DOWN ARROW
			game.movePieceDown();
			view.render(game.getState());
			break;
	}
});

// console.log(game);