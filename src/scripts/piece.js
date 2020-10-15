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
    constructor(ctx, ctxDos, firstColor, secondColor, x, y){
        this.ctx = ctx;
        this.ctxDos = ctxDos;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.piece = PIECE[Math.floor(Math.random() * PIECE.length)];
        this.x = x;
        this.y = y;
    }

    render(){
        this.piece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 1) {
                    this.ctx.fillStyle = this.firstColor;
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                } else if (value === 2) {
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
        let clone = JSON.parse(JSON.stringify(piece));

        // Transpose matrix, p is the Piece.
        for (let y = 0; y < piece.piece.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [piece.piece[x][y], piece.piece[y][x]] =
                    [piece.piece[y][x], piece.piece[x][y]];
            }
        }

        // Reverse the order of the columns.
        piece.piece.forEach(row => row.reverse());        return clone;
    }
}

