const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
// Solve a puzzle with valid puzzle string: POST request to /api/solve
test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."}
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, "769235418851496372432178956174569283395842761628713549283657194516924837947381625")

        done();
      });
    });
// Solve a puzzle with missing puzzle string: POST request to /api/solve
test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."}
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, "769235418851496372432178956174569283395842761628713549283657194516924837947381625")

        done();
      });
    });
// Solve a puzzle with invalid characters: POST request to /api/solve
test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .send(
       {puzzle: "..9..5.1.8!.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."}
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle' )

        done();
      });
    });
// Solve a puzzle with incorrect length: POST request to /api/solve
test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .send(
       {puzzle: "..9..5.1.8.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."}
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long' )

        done();
      });
    });
// Solve a puzzle that cannot be solved: POST request to /api/solve
test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .send(
       {puzzle: "..9..5.1.8.4....2432......11...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."}
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Puzzle cannot be solved' )

        done();
      });
    });
// Check a puzzle placement with all fields: POST request to /api/check
test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
       coordinate: 'a1',
       value: 7
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, true )

        done();
      });
    });
// Check a puzzle placement with single placement conflict: POST request to /api/check
test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
       coordinate: 'a2',
       value: 8
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false)
        assert.equal(res.body.conflict, 'region')

        done();
      });
    });
// Check a puzzle placement with multiple placement conflicts: POST request to /api/check
test("Check a puzzle placement with multiple placement conflict: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
       coordinate: 'c9',
       value: 3
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false)
        assert.equal(res.body.conflict.length, 2)
        

        done();
      });
    });
// Check a puzzle placement with all placement conflicts: POST request to /api/check
test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
       coordinate: 'a2',
       value: 9
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false)
        assert.equal(res.body.conflict.length, 3)
        

        done();
      });
    });
// Check a puzzle placement with missing required fields: POST request to /api/check
test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: '',
       coordinate: 'a2',
       value: 9
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing')
        
        done();
      });
    });
// Check a puzzle placement with invalid characters: POST request to /api/check
test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
       coordinate: 'z9',
       value: 1
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid coordinate')
        
        done();
      });
    });
// Check a puzzle placement with incorrect length: POST request to /api/check
test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
       coordinate: '9',
       value: 1
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid coordinate')
        
        done();
      });
    });
// Check a puzzle placement with invalid placement coordinate: POST request to /api/check
test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
       coordinate: 'a0',
       value: 1
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid coordinate')
        
        done();
      });
    });
// Check a puzzle placement with invalid placement value: POST request to /api/check
test("Check a puzzle placement with invalid plaement value: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .send(
       {puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
       coordinate: 'a2',
       value: 10
    }
      )
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value')
        
        done();
      });
    });
})
