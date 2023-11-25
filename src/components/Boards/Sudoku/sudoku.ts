import type { Board, canvasSizes } from '../Common/boards';
import { Cursor } from '../Common/boards';

export class SudokuBoard implements Board {
    gridSize: number;
    board: Array<Array<{ player: boolean; value: number | null; answer: number }>> = [];
    cursor: Cursor | null = null;

    // Game state
    paused: boolean = true;
    loaded: boolean = false;
    score: number = 0;
    mistakes: number = 0;
    time: number = 0;

    constructor(gridSize: number) {
        this.gridSize = gridSize;
    }
    calculateSizes(canvas: HTMLCanvasElement): canvasSizes {
        const width = canvas.width;
        const height = canvas.height;
        const squareSize = Math.floor(width / (this.gridSize + 0.5));
        const padding = width - this.gridSize * squareSize;

        const paddingL = padding / 2;
        const paddingT = padding / 2;
        const paddingR = width - this.gridSize * squareSize - paddingL;
        const paddingB = width - this.gridSize * squareSize - paddingT;

        return { width, height, squareSize, paddingT, paddingB, paddingL, paddingR };
    }
    clearBoard(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    draw(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const sizes = this.calculateSizes(canvas);

        this.clearBoard(ctx);
        this.drawGrid(ctx, sizes);
        if (this.isBoardValid() && !this.isPaused() && this.isLoaded()) {
            this.drawBoard(ctx, sizes);
            this.drawOutline(ctx, sizes);
        }
    }
    drawBoard(ctx: CanvasRenderingContext2D, sizes: canvasSizes): void {
        ctx.font = `${sizes.squareSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = this.board[row][col];
                if (!cell.value) continue;

                const x = sizes.paddingL + col * sizes.squareSize + sizes.squareSize / 2;
                const y = sizes.paddingT + row * sizes.squareSize + sizes.squareSize / 2;

                if (cell.value !== cell.answer) {
                    ctx.fillStyle = 'rgb(239, 68, 68)';
                } else {
                    if (cell.player) {
                        ctx.fillStyle = 'rgb(59, 130, 246)';
                    } else {
                        ctx.fillStyle = 'black';
                    }
                }

                ctx.fillText(cell.value.toString(), x, y + 5);
            }
        }
    }
    drawGrid(ctx: CanvasRenderingContext2D, sizes: canvasSizes): void {
        for (let i = 0; i < this.gridSize + 1; i++) {
            ctx.beginPath();
            ctx.strokeStyle = i % 3 === 0 ? 'black' : 'gray';
            ctx.lineWidth = i % 3 === 0 ? 2 : 1;

            const x = sizes.paddingL + i * sizes.squareSize;
            const y = sizes.paddingT + i * sizes.squareSize;

            // Draw vertical lines
            ctx.moveTo(x, sizes.paddingT);
            ctx.lineTo(x, sizes.width - sizes.paddingB);

            // Draw horizontal lines
            ctx.moveTo(sizes.paddingL, y);
            ctx.lineTo(sizes.width - sizes.paddingR, y);
            ctx.stroke();
        }
    }
    drawOutline(ctx: CanvasRenderingContext2D, sizes: canvasSizes): void {
        if (!this.cursor) return;

        const idx = this.cursor.getX();
        const idy = this.cursor.getY();
        const x = sizes.paddingL + idx * sizes.squareSize;
        const y = sizes.paddingT + idy * sizes.squareSize;
        const cur = this.board[idy][idx];

        ctx.fillStyle = 'rgba(37, 99, 235, 0.4)';
        ctx.fillRect(x, y, sizes.squareSize, sizes.squareSize);

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const cell = this.board[i][j];
                if (cell.value === cur.value && cur.value !== null && (i !== idy || j !== idx)) {
                    const x_temp = sizes.paddingL + j * sizes.squareSize;
                    const y_temp = sizes.paddingT + i * sizes.squareSize;
                    ctx.fillRect(x_temp, y_temp, sizes.squareSize, sizes.squareSize);
                }
            }
        }

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
    setBoard(board: Array<Array<number | null>>, solution: Array<Array<number>>): void {
        if (
            board.length !== solution.length ||
            board[0].length !== solution[0].length ||
            board.length !== this.gridSize ||
            board[0].length !== this.gridSize
        ) {
            throw new Error('Board and Solution are not the same size.');
        }

        this.board = []; // Initialize this.board as an empty array

        for (let row = 0; row < this.gridSize; row++) {
            this.board[row] = []; // Initialize each row as an empty array
            for (let col = 0; col < this.gridSize; col++) {
                this.board[row][col] = {
                    player: false,
                    value: board[row][col],
                    answer: solution[row][col]
                };
            }
        }
    }
    isBoardValid(): boolean {
        return this.board.length > 0;
    }
    resetState(): void {
        this.paused = false;
        this.score = 0;
        this.mistakes = 0;
        this.time = 0;
    }
    isLoaded(): boolean {
        return this.loaded;
    }
    setLoaded(loaded: boolean): void {
        this.loaded = loaded;
    }
    isPaused(): boolean {
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
    setCursor(input: { cursorX: number; cursorY: number }, sizes: canvasSizes): void {
        if (
            input.cursorX < sizes.paddingL ||
            input.cursorX > sizes.width - sizes.paddingR ||
            input.cursorY < sizes.paddingT ||
            input.cursorY > sizes.width - sizes.paddingB
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
    setNumber(num: number): boolean {
        if (!this.cursor) return false;

        const idx = this.cursor.getX();
        const idy = this.cursor.getY();

        if (this.board[idy][idx].value === null) {
            this.board[idy][idx].value = num;
            this.board[idy][idx].player = true;
            if (this.board[idy][idx].answer !== num) {
                this.mistakes++;
            }
            return true;
        }
        return false;
    }
    resetCursor(): void {
        this.cursor = null;
    }
    eraseNumber(): void {
        if (!this.cursor) return;

        const idx = this.cursor.getX();
        const idy = this.cursor.getY();

        if (this.board[idy][idx].player) {
            this.board[idy][idx].value = null;
            this.board[idy][idx].player = false;
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

export const convertSudokuSolution = (solution: string): Array<Array<number>> => {
    if (solution.length !== 81) {
        throw new Error('Board is not 81 characters long.');
    }

    const splitRows = solution.match(/.{1,9}/g);
    if (!splitRows) {
        throw new Error('Board could not be split into rows.');
    }
    const convertedBoard = splitRows.map((row) => row.split(''));

    return convertedBoard.map((row) => {
        return row.map((cell) => {
            if (typeof cell !== 'string') {
                throw new Error('Cell is not a string.');
            }
            return parseInt(cell);
        });
    });
};
