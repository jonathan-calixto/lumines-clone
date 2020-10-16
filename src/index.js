import './styles/index.scss';
import Lumines from './scripts/game';

document.querySelector("#start-lumines").addEventListener("click", startGame);
document.querySelector("#reset-lumines").addEventListener("click", resetGame);

const canvas = document.getElementById('game-board-id');
const canvasDos = document.getElementById('next-piece-id');

function startGame() {
    let board = new Lumines(canvas, canvasDos);
    

    board.generateField();
    console.table(board.grid);
    console.table(board.nextGrid);
    console.log(board);
}

function resetGame() {

}