class constantSetup{
	
	getRandInt(minIn,maxIn){
			return Math.floor(Math.random() * (maxIn-minIn)) + minIn;
	}

	chooseRandomExit(){
		//First choose which wall.
		let whichWall = this.getRandInt(0,4);
		let randRow = 0;
		let randCol = 0;
		console.log(whichWall);

		switch(whichWall){
			case(0):
				randRow = 0;
				randCol = this.getRandInt(0,boardWidth-1);
				break;

			case(1):
				randCol = boardWidth-1;
				randRow = this.getRandInt(0,boardHeight-1);
				break;

			case(2):
				randRow = boardHeight-1;
				randCol = this.getRandInt(0,boardWidth-1);

				break;

			case(3):
				randCol = 0;
				randRow = this.getRandInt(0,boardHeight-1);
				break;
			default:
				randCol = 0;
				randRow = this.getRandInt(0,boardHeight-1);
				break;
		}

		let exit = [randRow,randCol];
		return exit;
	}

}

let setup = new constantSetup();

const boardWidth = 10;
const boardHeight = 10;

const theseusStartingRow = Math.round(boardWidth/2);
const theseusStartingCol = Math.round(boardHeight/2);
const theseusSym = 'warrior.svg';

let minotaurStart = setup.chooseRandomExit();

const minotaurStartingRow = minotaurStart[0];
const minotaurStartingCol = minotaurStart[1];
const minotaurSym = 'minotaur.svg';

let exit = setup.chooseRandomExit();
const exitRow = exit[0];
const exitCol = exit[1];
const exitSym = 'flag.svg';

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
	theseusSym,
	minotaurSym
};
