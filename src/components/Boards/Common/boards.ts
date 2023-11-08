export interface Board {
    board: Array<Array<number | string | null>>;
    gridSize: number;

    drawGrid(canvas: HTMLCanvasElement): void;
    drawBoard(canvas: HTMLCanvasElement): void;
    resetState(): void;
    setBoard(board: Array<Array<number | string | null>>): void;
}
