class SudokuSolver {

	// Check if the number is already present 
	isSafe(board, row, col, num) {

		// Row has unique number
		for (let d = 0; d < board.length; d++) {
			if (board[row][d] == num) {
				return false;
			}
		}

		// Column has unique number
		for (let r = 0; r < board.length; r++) {

			// Check if the numberis already present inn column, return false;
			if (board[r][col] == num) {
				return false;
			}
		}

		// Corresponding square has
		// unique number (box-clash)
		let sqrt = Math.floor(Math.sqrt(board.length));
		let boxRowStart = row - row % sqrt;
		let boxColStart = col - col % sqrt;

		for (let r = boxRowStart;
			r < boxRowStart + sqrt; r++) {
			for (let d = boxColStart;
				d < boxColStart + sqrt; d++) {
				if (board[r][d] == num) {
					return false;
				}
			}
		}
		// If no conflict:
		return true;
	}

	solveSudoku(board, n) {
		let row = -1;
		let col = -1;
		let isFull = true;
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				if (board[i][j] == 0) {
					row = i;
					col = j;

					// still missing values 
					isFull = false;
					break;
				}
			}
			if (!isFull) {
				break;
			}
		}

		// No empty spaces 
		if (isFull) {
			return board; //
		}

		// Else for each-row backtrack
		for (let num = 1; num <= n; num++) {
			if (this.isSafe(board, row, col, num)) {
				board[row][col] = num;
				if (this.solveSudoku(board, n)) {

					// print(board, n);
					return board; //
				}
				else {

					// Replace it
					board[row][col] = 0;
				}
			}
		}
		return false;
	}

	convert(puzzleString) {
		let grid = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0,]
		];

		let row = -1;
		let col = 0;
		for (let i = 0; i < puzzleString.length; i++) {
			if (i % 9 == 0) {
				row++;
			}
			if (col % 9 == 0) {
				col = 0;
			}
		
			grid[row][col] = puzzleString[i] === "." ? 0 : + puzzleString[i];
			col++
		}
		return grid
	}
	
	letterToNumber(row) {
		switch (row.toUpperCase()) {
			case "A":
				return 1;
			case "B":
				return 2;
			case "C":
				return 3;
			case "D":
				return 4;
			case "E":
				return 5;
			case "F":
				return 6;
			case "G":
				return 7;
			case "H":
				return 8;
			case "I":
				return 9;
			default:
				return "loser";
		}
	}
	checkSquareVacant(grid, row, column) {
		if (grid[row - 1][column - 1] != 0) {
			return false;
		}
	}
	checkRowPlacement(puzzle, row, column, value) {
		let grid = this.convert(puzzle);
		row = this.letterToNumber(row);
		if (grid[row - 1][column - 1] == value) { return true };
		this.checkSquareVacant(grid, row, column);
		for (let i = 0; i < 9; i++) {
			if (grid[row - 1][i] == value) {
				return false;
			}
		}
		return true;
	}

	checkColPlacement(puzzle, row, column, value) {
		let grid = this.convert(puzzle);
		row = this.letterToNumber(row);
		if (grid[row - 1][column - 1] == value) {
			return true
		};
		this.checkSquareVacant(grid, row, column);
		for (let i = 0; i < 9; i++) {
			if (grid[i][column - 1] == value) {
				return false;
			}
		}
		return true;
	}

	checkRegionPlacement(puzzle, row, column, value) {
		let grid = this.convert(puzzle);
		row = this.letterToNumber(row);
		if (grid[row - 1][column - 1] == value) {
			return true
		};
		this.checkSquareVacant(grid, row, column);
		let startRow = Math.floor((row - 1) / 3) * 3, startColumn = Math.floor((column - 1) / 3) * 3;
		console.log('start row is ' + startRow + ' start col is ' + startColumn + ' value is' + value)
		for (let i = 0; i < 3; i++)
			for (let j = 0; j < 3; j++)
				if (grid[startRow + i][startColumn + j] == value) {
					return false;
				}
				return true;
	}

	transformBack(grid) {
		return grid.flat().join("")
	}

	solve(puzzle) {
		if (/[^0-9.]+/g.test(puzzle) || puzzle.length !== 81) {
			return false;
		}
		let N = 9;
		let grid = this.convert(puzzle)
		let solved = this.solveSudoku(grid, N);
		if (!solved) {
			return false;
		}
		console.log("solved is", solved)
		let solvedString = this.transformBack(solved);
		console.log("solved string is ", solvedString);
		return solvedString;
	}
}

module.exports = SudokuSolver;

