// Sudoku Generator
export const SudokuGenerator = {
    generateSudoku() {
        let board = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.fillBoard(board);
        this.removeNumbers(board);
        return board;
    },

    fillBoard(board) {
        const isValid = (board, row, col, num) => {
            for (let x = 0; x < 9; x++) {
                if (board[row][x] === num || board[x][col] === num ||
                    board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
                    return false;
                }
            }
            return true;
        }

        const solve = (board) => {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0) {
                        let numbers = this.shuffle(Array.from({ length: 9 }, (_, i) => i + 1));
                        for (let num of numbers) {
                            if (isValid(board, row, col, num)) {
                                board[row][col] = num;
                                if (solve(board)) {
                                    return true;
                                }
                                board[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        solve(board);
    },

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    removeNumbers(board) {
        let attempts = 5;
        while (attempts > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            while (board[row][col] === 0) {
                row = Math.floor(Math.random() * 9);
                col = Math.floor(Math.random() * 9);
            }
            let backup = board[row][col];
            board[row][col] = 0;

            let boardCopy = JSON.parse(JSON.stringify(board));
            if (!this.hasUniqueSolution(boardCopy)) {
                board[row][col] = backup;
                attempts--;
            }
        }
    },

    hasUniqueSolution(board) {
        const countSolutions = (board) => {
            let solutions = 0;
            const solve = (board) => {
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        if (board[row][col] === 0) {
                            for (let num = 1; num <= 9; num++) {
                                if (SudokuSolver.isValid(board, row, col, num)) {
                                    board[row][col] = num;
                                    if (solve(board)) {
                                        solutions++;
                                        if (solutions > 1) return true;
                                    }
                                    board[row][col] = 0;
                                }
                            }
                            return false;
                        }
                    }
                }
                return true;
            }
            solve(board);
            return solutions;
        }
        return countSolutions(board) === 1;
    }
};

// Sudoku Solver
export const SudokuSolver = {
    solveSudoku(board) {
        const solve = (board) => {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0) {
                        for (let num = 1; num <= 9; num++) {
                            if (this.isValid(board, row, col, num)) {
                                board[row][col] = num;
                                if (solve(board)) {
                                    return true;
                                }
                                board[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        return solve(board) ? board : null;
    },

    isValid(board, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num ||
                board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
                return false;
            }
        }
        return true;
    }
};

// Example usage
const puzzle = SudokuGenerator.generateSudoku();
// console.log('Generated Sudoku Puzzle:');
// console.log(puzzle);

const solvedPuzzle = SudokuSolver.solveSudoku(JSON.parse(JSON.stringify(puzzle)));
// console.log('Solved Sudoku Puzzle:');
// console.log(solvedPuzzle);