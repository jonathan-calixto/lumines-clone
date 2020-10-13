    // document.addEventListener("DOMContentLoaded", function() {
    //     const ctx = canvas.getContext('2d', { alpha: false });

    //     ctx.canvas.width = COLS * GRID_SIZE;
    //     ctx.canvas.height = ROWS * GRID_SIZE;

    //     ctx.scale(GRID_SIZE, GRID_SIZE);
    // });

// import Board from './board';
// const COLS = 16;
// const ROWS = 10;
const GRID_SIZE = 50;

export default class Lumines {
    constructor(props){
        this.canvas = document.getElementById('game-board-id');
        this.ctx = this.canvas.getContext('2d');

        this.canvasDos = document.getElementById('next-piece-id');
        this.ctxDos = canvasDos.getContext('2d');

        this.ctx.scale(GRID_SIZE, GRID_SIZE);
        this.ctxDos.scale(GRID_SIZE, GRID_SIZE);
    }

}