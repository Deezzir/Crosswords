export interface Board {
    board: Array<Array<number | string | object | null>>;
    gridSize: number;

    drawGrid(canvas: HTMLCanvasElement): void;
    drawBoard(canvas: HTMLCanvasElement): void;
    drawOutline(canvas: HTMLCanvasElement): void;
    resetState(): void;
    setBoard(
        board: Array<Array<number | string | object | null>>,
        solution: Array<Array<number | string | object>>
    ): void;
}

export class Cursor {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
