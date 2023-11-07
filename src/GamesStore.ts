import { defineStore } from 'pinia';

interface GameList {
    id: number;
    name: string;
    desc: string;
}

export const useGameStore = defineStore('GameStore', {
    state() {
        return {
            gameList: [
                { id: 1, name: 'Crosswords', desc: 'The classic crossword game' },
                { id: 2, name: 'Sudoku', desc: 'The classic sudoku game' }
            ] as GameList[],
            curGame: null as string | null
        };
    },
    getters: {
        getCurGame: (state) => state.curGame
    },
    actions: {
        setCurGame(game: string | null) {
            this.curGame = game;
        }
    }
});
