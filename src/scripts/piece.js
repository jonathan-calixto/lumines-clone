const PIECE = [
    [
        [2,2],
        [2,2]
    ],
    [
        [1,2],
        [1,2]
    ],
    [
        [1,2],
        [1,1]
    ],
    [
        [2,1],
        [2,1]
    ],
    [
        [2,1],
        [2,2]
    ],
    [
        [1,1],
        [1,1]
    ],
    [
        [2,1],
        [1,2]
    ],
    [
        [1,2],
        [2,1]
    ]
];
Object.freeze(PIECE);

const GRID_SIZE = 50;

export default class Piece {
    constructor(ctx, firstColor, secondColor, x, y){
        this.ctx = ctx;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.piece = PIECE[Math.floor(Math.random() * PIECE.length)];
        this.x = x;
        this.y = y;
    }

    render(){
        this.piece.forEach((row, y) => {
            row.forEach((posVal, x) => {
                if (posVal === 1) {
                    this.ctx.fillStyle = this.firstColor;
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                } else if (posVal === 2) {
                    this.ctx.fillStyle = this.secondColor;
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(piece){
        this.x = piece.x;
        this.y = piece.y;
    }

    rotate(piece){
        for (let y = 0; y < piece.piece.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [piece.piece[x][y], piece.piece[y][x]] =
                    [piece.piece[y][x], piece.piece[x][y]];
            }
        }
        piece.piece.forEach(row => row.reverse());
        return piece;
    }
}

