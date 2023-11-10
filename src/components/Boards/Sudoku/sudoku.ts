import type { Board } from '../Common/boards';

export class SudokuBoard implements Board {
    gridSize: number;
    board: Array<Array<number | null>> = [];
    solution: Array<Array<number>> = [];

    // Game state
    paused: boolean = true;
    started: boolean = false;
    score: number = 0;
    mistakes: number = 0;
    time: number = 0;

    constructor(gridSize: number) {
        this.gridSize = gridSize;
    }
    drawBoard(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        if (!ctx) return;

        const squareSize = Math.floor(size / (this.gridSize + 0.5));
        const padding = size - this.gridSize * squareSize;

        const paddingL = padding / 2;
        const paddingT = padding / 2;

        ctx.font = `${squareSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const value = this.board[row][col];
                if (!value) continue;

                const x = paddingL + col * squareSize + squareSize / 2;
                const y = paddingT + row * squareSize + squareSize / 2;

                ctx.fillText(value.toString(), x, y + 6);
            }
        }
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

        for (let i = 0; i < this.gridSize + 1; i++) {
            ctx.beginPath();
            ctx.strokeStyle = i % 3 === 0 ? 'black' : 'gray';
            ctx.lineWidth = 1;

            const x = paddingL + i * squareSize;
            const y = paddingT + i * squareSize;

            // Draw vertical lines
            ctx.moveTo(x, paddingT);
            ctx.lineTo(x, size - paddingB);

            // Draw horizontal lines
            ctx.moveTo(paddingL, y);
            ctx.lineTo(size - paddingR, y);
            ctx.stroke();
        }
    }
    setBoard(board: Array<Array<number | null>>): void {
        console.log(board);
        this.board = board;
    }
    isBoardValid(): boolean {
        return this.board.length > 0;
    }
    setSolution(solution: Array<Array<number>>): void {
        this.solution = solution;
        console.log(this.solution);
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
        console.log(data);
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
