import  express from 'express'
import {SudokuGenerator, SudokuSolver} from './sudoku.js';
import cors from 'cors';

const app = express(cors());
app.use(cors());

app.get('/api/puzzle-with-solution', (req, res) => {
    const puzzle = SudokuGenerator.generateSudoku();
    const solution = SudokuSolver.solveSudoku(JSON.parse(JSON.stringify(puzzle))); // Deep copy to prevent modification of original puzzle
    res.json({ puzzle, solution });
});

// Endpoint to solve a Sudoku puzzle



const port  = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`Server at http://localhost:${port}`)
})