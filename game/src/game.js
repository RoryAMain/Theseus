import { Game } from 'boardgame.io/core';

export const Theseus = Game({
	setup: () => (
			{ cells: Array(25).fill(null),
			theseusRow:4,
			theseusCol:2,} 
		),
	
	moves: {
		clickCell(G,ctx,id) {
			const cells = [...G.cells];
			
			cells[id] = ctx.currentPlayer;
			
			return {...G,cells};
		},
		
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
		}
	},
	
	flow: {
	},

});
