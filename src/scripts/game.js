import Piece from "./piece";

const GRID_SIZE = 50;
const ROWS = 10;
const COLS = 16;
const PIECE_ROWS = 8;
const PIECE_COLS = 4;
Object.freeze(COLS, ROWS, GRID_SIZE, PIECE_ROWS, PIECE_COLS);

const COLOR = [
    "thistle",
    "darkslategray",
    "#FC7A1E", // pumpkin
    "#C5E99B", // yellow-green crayola
    "#EDD2E0", // queen pink
    "#6E4555", // eggplant
    '#584FEC',
    '#000000',
    '#E7E7E7',
    '#F24C00',
];
Object.freeze(COLOR);

const ANIMATION = {
    down: piece => ({ ...piece, y: piece.y + 1 }),
};

export default class Lumines {
    constructor(canvas, canvasDos){
        this.ctx = canvas.getContext('2d');
        this.ctxDos = canvasDos.getContext('2d');
        // debugger
        // this.dimensions = { width: canvas.width, height: canvas.height };
        // this.dimensionsDos = { width: canvasDos.width, height: canvasDos.height };

        this.firstColor = "black"; // COLOR[Math.floor(Math.random() * COLOR.length)];
        this.secondColor = "#FC7A1E"; // COLOR[Math.floor(Math.random() * COLOR.length)];
        // colors may be the same, need refactoring for no duplicate colors
        console.log(this.firstColor, this.secondColor); //remove after I refactor for correct colors

        this.ctx.scale(GRID_SIZE, GRID_SIZE);
        this.ctxDos.scale(GRID_SIZE, GRID_SIZE);
        this.movement();
        this.animate = this.animate.bind(this);
        this.time = { 
            start: 0, 
            elapsed: 0, 
            seconds: 750
        };
    }

    generateField() {
        this.grid = this.getNewBoard();
        this.nextGrid = this.getNewPieceBoard();
        this.generatePieces();
        this.animate();
    }

    generatePieces(){
        const startPosition = {
            x: 7,
            y: 0
        };

        this.piece = new Piece(this.ctx, this.firstColor, this.secondColor, startPosition.x, startPosition.y);
        console.log(this.piece);
        this.secondPiece = new Piece(this.ctxDos, this.firstColor, this.secondColor, startPosition.x = 1, startPosition.y = 1);
        console.log(this.secondPiece);
        console.table(this.grid);
        this.thirdPiece = new Piece(this.ctxDos, this.firstColor, this.secondColor, startPosition.x = 1, startPosition.y = 4);
        this.fourthPiece = new Piece(this.ctxDos, this.firstColor, this.secondColor, startPosition.x = 1, startPosition.y = 7);
    }

    getNewBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    getNewPieceBoard(){
        return Array.from({ length: PIECE_ROWS }, () => Array(PIECE_COLS).fill(0));
    }


    movement() {
        const POSITION = {
            left: piece => ({ ...piece, x: piece.x - 1 }),
            right: piece => ({ ...piece, x: piece.x + 1 }),
            down: piece => ({ ...piece, y: piece.y + 1 }),
            up: piece => ({ ...piece, y: piece.y - 1 }),
            keyE: piece => this.piece.rotate(piece)
        };
        Object.freeze(POSITION);

        document.addEventListener("keydown", (event) => {
            if (event.defaultPrevented) return;

            switch (event.code) {
                case "KeyW": // remove these 2 cases, no need for the player to move back up
                case "ArrowUp": // look up top ^^
                    let newPosUp = POSITION.up(this.piece);
                    if (this.validPosition(newPosUp)) {
                        this.piece.move(newPosUp);
                    }
                    break;
                case "KeyS":
                case "ArrowDown":
                    let newPosDown = POSITION.down(this.piece);
                    if (this.validPosition(newPosDown)) {
                        this.piece.move(newPosDown);
                    }
                    break;
                case "KeyA":
                case "ArrowLeft":
                    let newPosLeft = POSITION.left(this.piece);
                    if (this.validPosition(newPosLeft)) {
                        this.piece.move(newPosLeft);
                    }
                    break;
                case "KeyD":
                case "ArrowRight":
                    let newPosRight = POSITION.right(this.piece);
                    if (this.validPosition(newPosRight)) {
                        this.piece.move(newPosRight);
                    }
                    break;
                case "KeyE":
                // case "ArrowRight":
                    let newPosRotate = POSITION.keyE(this.piece);
                    if (this.validPosition(newPosRotate)) {
                        this.piece.move(newPosRotate);
                    }
                    break;
            }
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.animate();

            event.preventDefault();
        });
    }

    sideBoundaries(x) {
        return x >= 0 && x < COLS;
    }

    bottomBoundary(y) {
        return y < ROWS;
    }

    emptyPos(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    validPosition(piece) {
        return piece.piece.every((row, dy) => {
            return row.every((pos, dx) => {
                let x = piece.x + dx;
                let y = piece.y + dy;
                return (this.emptyPos(x, y) && (this.sideBoundaries(x) && this.bottomBoundary(y)));
            });
        });
    }

    animate(now = 0){
        this.time.elapsed = now - this.time.start;

        if (this.time.elapsed > this.time.seconds){
            this.time.start = now;
            this.animatePiece();
        }
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.piece.render();
        this.secondPiece.render();
        this.thirdPiece.render();
        this.fourthPiece.render();

        this.grid.forEach((row, y) => {
            row.forEach((posVal, x) => {
                if (posVal === 1) {
                    this.ctx.fillStyle = this.firstColor;
                    this.ctx.fillRect(x, y, 1, 1);
                } else if (posVal === 2) {
                    this.ctx.fillStyle = this.secondColor;
                    this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
        requestAnimationFrame(this.animate);
    }

    animatePiece(){
        let newPosDown = ANIMATION.down(this.piece);
        let startPosition = {
            x: 1,
            y: 7
        };

        if (this.validPosition(newPosDown)) {
            this.piece.move(newPosDown);
        } else {
            this.dropPiece();
            this.piece = this.secondPiece;
            this.piece.ctx = this.ctx;
            this.piece.x = 7;
            this.piece.y = 0;
            
            this.secondPiece = this.thirdPiece;
            this.secondPiece.x = 1;
            this.secondPiece.y = 1;

            this.thirdPiece = this.fourthPiece;
            this.thirdPiece.x = 1;
            this.thirdPiece.y = 4;

            this.fourthPiece = new Piece(this.ctxDos, this.firstColor, this.secondColor, startPosition.x, startPosition.y);
        }
    }

    dropPiece(){
        this.piece.piece.forEach((row, y) => {
            row.forEach((posVal, x) => {
                if (posVal > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = posVal;
                }
            });
        });
    }
}