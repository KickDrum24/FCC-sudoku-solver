const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let validPuzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
suite('UnitTests', () => {

    test("Logic handles a valid puzzle string of 81 characters", (done) => {
        let complete = "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
        assert.equal(solver.solve(validPuzzle), complete);
        done();
    })

    test("Logic handles a valid puzzle string with invalid characters (not 1-9 or .)", (done) => {
        let invalidPuzzle = "..9..5.1.85.4....24&2......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.equal(solver.solve(invalidPuzzle), false);
        done();
    })
  
    test("Logic handles a valid puzzle string that is not 81 characters in length", (done) => {
        let invalidPuzzle = "..9..5.1.85.4....242......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        assert.equal(solver.solve(invalidPuzzle), false);
        done();
    })
    
    test("Logic handles a valid row placement", (done) => {
        assert.equal(solver.checkRowPlacement(validPuzzle, "a", 1, 7), true);
        done();
    })
    // Logic handles an invalid row placement
    test("Logic handles a invalid row placement", (done) => {
        assert.equal(solver.checkRowPlacement(validPuzzle, "a", 2, 9), false);
        done();
    })
    
    test("Logic handles a valid column placement", (done) => {
        assert.equal(solver.checkColPlacement(validPuzzle, "a", 1, 7), true);
        done();
    })
   
    test("Logic handles an invalid column placement", (done) => {
        assert.equal(solver.checkColPlacement(validPuzzle, "a", 1, 8), false);
        done();
    })
    
    test("Logic handles a valid region (3x3 grid) placement", (done) => {
        assert.equal(solver.checkRegionPlacement(validPuzzle, "b", 2, 5), true);
        done();
    })
   
    test("Logic handles an invalid region (3x3 grid) placement", (done) => {
        assert.equal(solver.checkRegionPlacement(validPuzzle, "b", 3, 3), false);
        done();
    })
    
    test("Valid puzzle strings pass the solver", (done) => {
        let complete = "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
        assert.equal(solver.solve(validPuzzle), complete);
        done();
    })
  
    test("Invalid puzzle strings fail the solver", (done) => {
        let invalidPuzzle = "..9..5.1.85.4....242......1...69.83.9.....6.62.71...9......1945....4.37.4.3..66.."
        assert.equal(solver.solve(invalidPuzzle), false);
        done();
    })
    
    test("Solver returns the expected solution for an incomplete puzzle", (done) => {
        let complete = "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
        assert.equal(solver.solve(validPuzzle), complete);
        done();
    })

});
