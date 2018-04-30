const boardWidth = 7;
const boardHeight = 7;
const theseusStartingRow = 1;
const theseusStartingCol = 1;
const minotaurStartingRow = 5;
const minotaurStartingCol = 1;
const exitRow = 5;
const exitCol = 6;
const exitSym = "X";

const walls = [0,1,2,3,4,5,6,7,14,21,28,35,42,13,20,27,34,48,43,44,45,46,47,48,15,29,38,31,24,18,33];
const wallSym = "W";

export{
	boardWidth,
	boardHeight,
	theseusStartingRow,
	theseusStartingCol,
	minotaurStartingRow,
	minotaurStartingCol,
	exitRow,
	exitCol,
	exitSym,
	walls,
	wallSym
};
