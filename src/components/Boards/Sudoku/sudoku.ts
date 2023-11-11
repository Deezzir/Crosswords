import type { Board } from '../Common/boards';
import { Cursor } from '../Common/boards';

export class SudokuBoard implements Board {
    gridSize: number;
    board: Array<Array<number | null>> = [];
    solution: Array<Array<number>> = [];
    cursor: Cursor | null = null;

    // Game state
    paused: boolean = true;
    started: boolean = false;
    score: number = 0;
    mistakes: number = 0;
    time: number = 0;

    constructor(gridSize: number) {
        this.gridSize = gridSize;
    }
    calculateSizes(canvasSize: number): {
        squareSize: number;
        paddingT: number;
        paddingB: number;
        paddingL: number;
        paddingR: number;
    } {
        const squareSize = Math.floor(canvasSize / (this.gridSize + 0.5));
        const padding = canvasSize - this.gridSize * squareSize;

        const paddingL = padding / 2;
        const paddingT = padding / 2;
        const paddingR = canvasSize - this.gridSize * squareSize - paddingL;
        const paddingB = canvasSize - this.gridSize * squareSize - paddingT;

        return { squareSize, paddingT, paddingB, paddingL, paddingR };
    }
    drawBoard(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        if (!ctx) return;

        const sizes = this.calculateSizes(size);

        ctx.font = `${sizes.squareSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const value = this.board[row][col];
                if (!value) continue;

                const x = sizes.paddingL + col * sizes.squareSize + sizes.squareSize / 2;
                const y = sizes.paddingT + row * sizes.squareSize + sizes.squareSize / 2;

                if (value !== this.solution[row][col]) {
                    ctx.fillStyle = 'red';
                } else {
                    ctx.fillStyle = 'black';
                }
                ctx.fillText(value.toString(), x, y + 6);
            }
        }
    }
    drawGrid(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        if (!ctx) return;

        const sizes = this.calculateSizes(size);

        for (let i = 0; i < this.gridSize + 1; i++) {
            ctx.beginPath();
            ctx.strokeStyle = i % 3 === 0 ? 'black' : 'gray';
            ctx.lineWidth = 1;

            const x = sizes.paddingL + i * sizes.squareSize;
            const y = sizes.paddingT + i * sizes.squareSize;

            // Draw vertical lines
            ctx.moveTo(x, sizes.paddingT);
            ctx.lineTo(x, size - sizes.paddingB);

            // Draw horizontal lines
            ctx.moveTo(sizes.paddingL, y);
            ctx.lineTo(size - sizes.paddingR, y);
            ctx.stroke();
        }
    }
    drawCursor(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        if (!ctx || !this.cursor) return;

        const sizes = this.calculateSizes(size);
        const idx = this.cursor.getX();
        const idy = this.cursor.getY();
        const x = sizes.paddingL + idx * sizes.squareSize;
        const y = sizes.paddingT + idy * sizes.squareSize;

        ctx.fillStyle = 'rgba(37, 99, 235, 0.4)';
        ctx.fillRect(x, y, sizes.squareSize, sizes.squareSize);

        ctx.fillStyle = 'rgba(107, 114, 128, 0.3)';
        for (let i = 0; i < this.gridSize; i++) {
            const x_temp = sizes.paddingL + i * sizes.squareSize;
            const y_temp = sizes.paddingT + i * sizes.squareSize;
            if (y_temp !== y) {
                ctx.fillRect(x, y_temp, sizes.squareSize, sizes.squareSize);
            }
            if (x_temp !== x) {
                ctx.fillRect(x_temp, y, sizes.squareSize, sizes.squareSize);
            }
        }

        const startRow = idy - (idy % 3);
        const startCol = idx - (idx % 3);
        ctx.fillStyle = 'rgba(107, 114, 128, 0.3)';
        for (let row = startRow; row < startRow + 3; row++) {
            for (let col = startCol; col < startCol + 3; col++) {
                if (row === idy || col === idx) continue;
                const x_temp = sizes.paddingL + col * sizes.squareSize;
                const y_temp = sizes.paddingT + row * sizes.squareSize;
                ctx.fillRect(x_temp, y_temp, sizes.squareSize, sizes.squareSize);
            }
        }
    }
    setBoard(board: Array<Array<number | null>>): void {
        this.board = board;
    }
    isBoardValid(): boolean {
        return this.board.length > 0;
    }
    setSolution(solution: Array<Array<number>>): void {
        this.solution = solution;
    }
    resetState(): void {
        this.paused = false;
        this.started = false;
        this.score = 0;
        this.mistakes = 0;
        this.time = 0;
    }
    getPaused(): boolean {
        return this.paused;
    }
    setPaused(paused: boolean): void {
        this.paused = paused;
    }
    togglePaused(): void {
        this.paused = !this.paused;
    }
    incrementTimePassed(): void {
        this.time++;
    }
    getTimePassed(): number {
        return this.time;
    }
    getMistakes(): number {
        return this.mistakes;
    }
    getScore(): number {
        return this.score;
    }
    setCursor(input: { cursorX: number; cursorY: number; canvasSize: number }): void {
        const sizes = this.calculateSizes(input.canvasSize);

        if (
            input.cursorX < sizes.paddingL ||
            input.cursorX > input.canvasSize - sizes.paddingR ||
            input.cursorY < sizes.paddingT ||
            input.cursorY > input.canvasSize - sizes.paddingB
        ) {
            return;
        }

        const idx = Math.floor((input.cursorX - sizes.paddingL) / sizes.squareSize);
        const idy = Math.floor((input.cursorY - sizes.paddingT) / sizes.squareSize);

        if (!this.cursor) {
            this.cursor = new Cursor(idx, idy);
        } else {
            this.cursor.set(idx, idy);
        }
    }
    setNumber(num: number): void {
        if (!this.cursor) return;

        const idx = this.cursor.getX();
        const idy = this.cursor.getY();

        if (this.board[idy][idx] === null) {
            this.board[idy][idx] = num;
            if (this.solution[idy][idx] !== num) {
                this.mistakes++;
            }
        }
    }
}

export const getSudokuBoard = async (difficulty: string): Promise<string> => {
    const url = new URL(import.meta.env.VITE_SUDOKU_API_URL);
    url.search = new URLSearchParams({
        seed: String(Date.now()),
        difficulty: difficulty.toLowerCase()
    }).toString();

    const options = {
        method: 'GET',
        headers: {
            'X-API-Key': import.meta.env.VITE_SUDOKU_API_KEY
        }
    };

    try {
        const response = await fetch(url.toString(), options);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (typeof data.board !== 'string') {
            throw new Error('Puzzle is not a string.');
        }
        return data.board;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const solveSudokuBoard = async (board: string): Promise<string> => {
    const url = new URL(import.meta.env.VITE_SUDOKU_SOLVE_API_URL);
    url.search = new URLSearchParams({
        board: board
    }).toString();

    const options = {
        method: 'GET',
        headers: {
            'X-API-Key': import.meta.env.VITE_SUDOKU_API_KEY
        }
    };

    try {
        const response = await fetch(url.toString(), options);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (typeof data.solution !== 'string') {
            throw new Error('Solution is not a string.');
        }
        return data.solution;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const convertSudokuBoard = (board: string): Array<Array<number | null>> => {
    if (board.length !== 81) {
        throw new Error('Board is not 81 characters long.');
    }

    const splitRows = board.match(/.{1,9}/g);
    if (!splitRows) {
        throw new Error('Board could not be split into rows.');
    }
    const convertedBoard = splitRows.map((row) => row.split(''));

    return convertedBoard.map((row) => {
        return row.map((cell) => {
            if (cell === '.') {
                return null;
            }
            return parseInt(cell);
        });
    });
};
