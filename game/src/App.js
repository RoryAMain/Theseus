import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import { TheseusBoard } from './board';
import {boardWidth,boardHeight,theseusStartingRow,theseusStartingCol,minotaurStartingRow,minotaurStartingCol} from './constants';

const Theseus = Game({
	setup: () => (
			{ 
				cells: Array((boardWidth*boardHeight)).fill(null),
				theseusRow: theseusStartingRow,
				theseusCol: theseusStartingCol,
				minotaurRow: minotaurStartingRow,
				minotaurCol: minotaurStartingCol
			}
		),
	
	moves: {
		//0:N,1:E,2:S,3:W
		moveTheseus(G,ctx,direction) {
			const cells = [...G,cells];
			
			switch(direction) {
				case(0):
					if(G.theseusRow > 0){
						G.theseusRow--;
					}
					break;
				case(1):
					if(G.theseusCol < 4){
						G.theseusCol++;
					}
					break;
				case(2):
					if(G.theseusRow < 4){
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
			
			const newPosition = G.theseusRow * 5 + G.theseusCol;
			cells[newPosition] = ctx.currentPlayer;
			
			return {...G,cells};
		},
	
	//0:N,1:E,2:S,3:W
	moveMinotaur(G,ctx,direction) {
		const cells = [...G,cells];
		
		switch(direction) {
			case(0):
				if(G.minotaurRow > 0){
					G.minotaurRow--;
					if(G.minotaurRow > 0){
						G.minotaurRow--;
					}
				}
				break;
			case(1):
				if(G.minotaurCol < 4){
					G.minotaurCol++;
					if(G.minotaurCol < 4){
						G.minotaurCol++;
					}
				}
				break;
			case(2):
				if(G.minotaurRow < 4){
					G.minotaurRow++;
					if(G.minotaurRow < 4){
						G.minotaurRow++;
					}
				}
				break;
			case(3):
				if(G.minotaurCol > 0){
					G.minotaurCol--;
					if(G.minotaurCol > 0){
						G.minotaurCol--;
					}
				}
				break;
			default:
				break;
		}
		
		const newPosition = G.minotaurRow * 5 + G.minotaurCol;
		cells[newPosition] = ctx.currentPlayer;
		
		return {...G,cells};
	}
},

});


const App = Client({
	game: Theseus,
	board: TheseusBoard,
});

export default App;
