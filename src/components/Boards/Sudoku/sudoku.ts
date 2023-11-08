const getSudokuBoard = async (difficulty: string): Promise<string> => {
    const url = new URL(import.meta.env.VITE_SUDOKU_API_URL);
    url.search = new URLSearchParams({
        seed: String(Date.now()),
        difficulty: difficulty.toLowerCase()
    }).toString();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_SUDOKU_API_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_SUDOKU_API_HOST
        }
    };

    try {
        const response = await fetch(url.toString(), options);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (typeof data.puzzle !== 'string') {
            throw new Error('Puzzle is not a string.');
        }
        return data.puzzle;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getSudokuBoard
};
