export type canvasSizes = {
    width: number;
    height: number;
    squareSize: number;
    paddingT: number;
    paddingB: number;
    paddingL: number;
    paddingR: number;
};

export interface Board {
    board: Array<Array<number | string | object | null>>;
    gridSize: number;

    draw(canvas: HTMLCanvasElement): void;
    drawGrid(ctx: CanvasRenderingContext2D, sizes: canvasSizes): void;
    drawBoard(ctx: CanvasRenderingContext2D, sizes: canvasSizes): void;
    drawOutline(ctx: CanvasRenderingContext2D, sizes: canvasSizes): void;
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
