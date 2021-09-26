'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      // You can POST to /api/check an object containing puzzle, coordinate, and value where 
      // the coordinate is the letter A-I indicating the row, followed by a number 1-9 indicating 
      // the column, and value is a number from 1-9.

      const {puzzle, coordinate, value} = req.body
      
      // If the object submitted to /api/check is missing puzzle, coordinate or value, the returned 
      // value will be { error: Required field(s) missing }
      if (!puzzle || !coordinate || !value) {
        res.json({ error: 'Required field(s) missing' });
        return;
      }

      // If the value submitted to /api/check is not a number between 1 and 9, the returned values 
      // will be { error: 'Invalid value' }
      if (/[^1-9]/g.test(value)) {
        res.json({ error: 'Invalid value' })
        return
      }

      // If the puzzle submitted to /api/check is greater or less than 81 characters, the returned 
      // value will be { error: 'Expected puzzle to be 81 characters long' }
      if (puzzle.length !== 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }
      // If the puzzle submitted to /api/check contains values which are not numbers or periods, 
      // the returned value will be { error: 'Invalid characters in puzzle' }

      if (/[^0-9.]+/g.test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' })
        return
      }

      // If the coordinate submitted to api/check does not point to an existing grid cell, 
      // the returned value will be { error: 'Invalid coordinate'}

      if (/[^A-Ia-i]/g.test(coordinate[0]) ||
        /[^1-9]/g.test(coordinate[1]) ||
        coordinate.length !== 2) {
        res.json({ error: 'Invalid coordinate' })
        return;
      }

      // The return value from the POST to /api/check will be an object containing a valid property, 
      // which is true if the number may be placed at the provided coordinate and false if the number 
      // may not. If false, the returned object will also contain a conflict property which is an 
      // array containing the strings "row", "column", and/or "region" depending on which makes 
      // the placement invalid.
      const row = coordinate[0];
      const column = coordinate[1];
      let valdCol = solver.checkColPlacement(puzzle, row, column, value);
      let valdRow = solver.checkRowPlacement(puzzle, row, column, value);
      let valdReg = solver.checkRegionPlacement(puzzle, row, column, value);
      let conflicts = [];
      if (valdCol && valdRow && valdReg){
        res.json({valid: true})
      }else{
        if(!valdRow){
          conflicts.push("row");
        }
        if(!valdCol){
          conflicts.push("column");
        }
        if(!valdReg){
          conflicts.push("region");
        }
        res.json({valid: false, conflict: conflicts})
      }

    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      // If the object submitted to /api/solve is missing puzzle, the returned value will be 
      // { error: 'Required field missing' }

      if (!puzzle) {
        res.json({ error: 'Required field missing' })
        return;
      }

      // If the puzzle submitted to /api/solve contains values which are not numbers or periods, 
      // the returned value will be { error: 'Invalid characters in puzzle' }
      if (/[^0-9.]/g.test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      }
      // If the puzzle submitted to /api/solve is greater or less than 81 characters, the returned 
      // value will be { error: 'Expected puzzle to be 81 characters long' }
      if (puzzle.length !== 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }
      // You can POST /api/solve with form data containing puzzle which will be a string containing 
      // a combination of numbers (1-9) and periods . to represent empty spaces. The returned object 
      // will contain a solution property with the solved puzzle.
      
      let solvedString = solver.solve(puzzle);
      if (!solvedString) {
        res.json({ error: "Puzzle cannot be solved" })
      } else {
        res.json({ solution: solvedString });
      }
    });
};
