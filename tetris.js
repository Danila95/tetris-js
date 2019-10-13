import Game from './src/Game.js';

const game = new Game();

window.game = game; // получить доступ к объекту game, т.к. мы исполь. модули константы не поподают в группу глобальных пространства имен

console.log(game);