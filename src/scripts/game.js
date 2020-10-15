import Piece from "./piece";

const COLS = 16;
const ROWS = 10;
const GRID_SIZE = 50;
// Object.freeze(COLS, ROWS, GRID_SIZE);

const COLOR = [
    "thistle",
    "darkslategray",
    "#FC7A1E", // pumpkin
    "#C5E99B", // yellow-green crayola
    "#EDD2E0", // queen pink
    "#6E4555" // eggplant
];
Object.freeze(COLOR);

export default class Lumines {
    constructor(canvas, canvasDos){
        this.ctx = canvas.getContext('2d');
        this.ctxDos = canvasDos.getContext('2d');
        // debugger
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.dimensionsDos = { width: canvasDos.width, height: canvasDos.height };

        this.firstColor = COLOR[Math.floor(Math.random() * COLOR.length)];
        this.secondColor = COLOR[Math.floor(Math.random() * COLOR.length)];

        this.ctx.scale(GRID_SIZE, GRID_SIZE);
        this.ctxDos.scale(GRID_SIZE, GRID_SIZE);
        this.movement();
        // this.drawBoard();
    }

    resetField() {
        const startPosition = {
            x: 7,
            y: 0
        };

        this.grid = this.getNewBoard();
        this.piece = new Piece(this.ctx, this.ctxDos, this.firstColor, this.secondColor, startPosition.x, startPosition.y);
        this.piece.render();
    }

    getNewBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    // drawBoard() {
    //     var p = 10;

    //     for (var x = 0; x <= GRID_SIZE; x += 40) {
    //         this.ctx.moveTo(0.5 + x + p, p);
    //         this.ctx.lineTo(0.5 + x + p, GRID_SIZE + p);
    //     }

    //     for (var x = 0; x <= GRID_SIZE; x += 40) {
    //         this.ctx.moveTo(p, 0.5 + x + p);
    //         this.ctx.lineTo(GRID_SIZE + p, 0.5 + x + p);
    //     }

    //     this.ctx.strokeStyle = "black";
    //     this.ctx.stroke();
    // }

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
            this.piece.render();

            event.preventDefault();
        }, true);
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y < ROWS;
    }

    isEmpty(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    validPosition(piece) {
        return piece.piece.every((row, dy) => {
            return row.every((value, dx) => {
                let x = piece.x + dx;
                let y = piece.y + dy;
                return (this.isEmpty(value) || (this.insideWalls(x) & this.aboveFloor(y)));
            });
        });
    }
}