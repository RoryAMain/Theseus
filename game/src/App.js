import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import { TheseusBoard } from './board';
import {boardWidth,boardHeight,theseusStartingRow,theseusStartingCol,minotaurStartingRow,minotaurStartingCol, exitRow, exitCol,exitSym,walls,wallSym} from './constants';

function isFailure(theseusRow,theseusCol,minotaurRow,minotaurCol){
	if(theseusRow === minotaurRow && theseusCol === minotaurCol)
	{
		return true;
	}
}

function isVictory(theseusRow,theseusCol,exitRow,exitCol){
	if(theseusRow === exitRow && theseusCol === exitCol){
		return true;
	}
}

const Theseus = Game({
	//Setup section initializes cells, and creates variables found in G
	setup: (ctx) => {
			
				let G = {
				cells: Array(boardHeight*boardWidth).fill(null),
				theseusRow: theseusStartingRow,
				theseusCol: theseusStartingCol,
				minotaurRow: minotaurStartingRow,
				minotaurCol: minotaurStartingCol,
				theseusPos: theseusStartingRow*boardWidth + theseusStartingCol,
				minotaurPos: minotaurStartingRow*boardWidth + minotaurStartingCol,
				wallSym: wallSym,
				};
				
				const theseusPosition = G.theseusRow * boardWidth + G.theseusCol;
				const minotaurPosition = G.minotaurRow * boardWidth + G.minotaurCol;
				const exitPosition = exitRow * boardWidth + exitCol;
				G.cells[theseusPosition] = 0;
				G.cells[minotaurPosition] = 1;
				G.cells[exitPosition] = exitSym;
				
				var wallLength = walls.length;
				
				for(var i = 0; i <wallLength; i++)
				{
					G.cells[walls[i]] = wallSym;
				}
				
				return G;
		},

	moves: {
		//0:N,1:E,2:S,3:W
		moveTheseus(G,ctx,direction) {
			const cells = [...G.cells];
			cells[G.theseusPos] = null;
			switch(direction) {
				case(0):
					if(G.theseusRow > 0){
						G.theseusRow--;
					}
					break;
				case(1):
					if(G.theseusCol < boardWidth-1){
						G.theseusCol++;
					}
					break;
				case(2):
					if(G.theseusRow < boardHeight-1){
						G.theseusRow++;
					}
					break;
				case(3):
					if(G.theseusCol > 0){
						G.theseusCol--;
					}
					break;
				default:
					break;
			}

			G.theseusPos = G.theseusRow * boardWidth + G.theseusCol;
			cells[G.theseusPos] = ctx.currentPlayer;
			return {...G,cells};
		},

		//0:N,1:E,2:S,3:W
		moveMinotaur(G,ctx,direction) {
			const cells = [...G.cells];
			
			cells[G.minotaurPos] = null;
			
			switch(direction) {
				case(0):
					if(G.minotaurRow > 0){
						G.minotaurRow--;
					}
					break;
				case(1):
					if(G.minotaurCol < boardWidth-1){
						G.minotaurCol++;
					}
					break;
				case(2):
					if(G.minotaurRow < boardHeight-1){
						G.minotaurRow++;
					}
					break;
				case(3):
					if(G.minotaurCol > 0){
						G.minotaurCol--;
					}
					break;
				default:
					break;
			}

			G.minotaurPos = G.minotaurRow * boardWidth + G.minotaurCol;
			cells[G.minotaurPos] = ctx.currentPlayer;
			return {...G,cells};
		},
		
		//Utility to display all cells ID's. Good for debugging maps.
		showCellsId(G,ctx){
			const cells = [...G.cells];
			for (let i = 0; i < boardHeight; i++) {
				for(let j=0;j<boardWidth;j++) {
					let id = boardWidth * i + j;
					cells[id] = id;
				}
			}
			return {...G,cells};
		}
	},


	flow: {
		endGameIf: (G,ctx) => {
			if(isFailure(G.theseusRow,G.theseusCol,G.minotaurRow,G.minotaurCol)){
				return("Minotaur");
			}
			else if(isVictory(G.theseusRow,G.theseusCol,exitRow,exitCol)){
				return("Theseus");
			}
		}
	},

});


const App = Client({
	game: Theseus,
	board: TheseusBoard,
});

export default App;
