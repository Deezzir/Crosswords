import type { Board } from '../Common/boards';

type Direction = 'horizontal' | 'vertical';

export class Word {
    text: string;
    row: number;
    col: number;
    direction: Direction;

    constructor(text: string, row: number, col: number, direction: Direction) {
        this.text = text;
        this.row = row;
        this.col = col;
        this.direction = direction;
    }
}

export class CrosswordsBoard implements Board {
    gridSize: number;
    board: Array<Array<string | null>> = [];

    constructor(gridSize: number) {
        this.gridSize = gridSize;
    }
    drawGrid(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;

        if (!ctx) return;

        const squareSize = Math.floor(size / (this.gridSize + 0.5));
        const padding = size - this.gridSize * squareSize;

        const paddingL = padding / 2;
        const paddingT = padding / 2;
        const paddingR = size - this.gridSize * squareSize - paddingL;
        const paddingB = size - this.gridSize * squareSize - paddingT;

        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        ctx.beginPath();
        for (let x = paddingL; x <= size - paddingR; x += squareSize) {
            ctx.moveTo(x, paddingT);
            ctx.lineTo(x, size - paddingB);
        }
        for (let y = paddingT; y <= size - paddingB; y += squareSize) {
            ctx.moveTo(paddingL, y);
            ctx.lineTo(size - paddingR, y);
        }
        ctx.stroke();
    }
    drawBoard(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;

        if (!ctx) return;
        console.log(size);
    }
    resetState(): void {}
    setBoard(board: Array<Array<string | null>>): void {
        this.board = board;
    }
}
