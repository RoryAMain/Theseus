import React from 'react';
import {boardWidth,boardHeight} from './constants';

export class TheseusBoard extends React.Component {
	
	//Launched by Theseus Controls, triggers Theseus move.
	moveTheseusButton(id){
		if(this.isTheseusTurn()){
			if(this.wallCheck(id)){
				this.props.moves.moveTheseus(id);
				this.props.events.endTurn();
			}
		}
	}
	
	//Check to see if it's Theseus turn.
	isTheseusTurn()
	{
		if(this.props.ctx.currentPlayer==='0'){
			return true;
		}
		
		return false;
	}
	
	//Launched by Minotaur Controls, triggers 2 Minotaur moves in the same direction.
	moveMinotaurButton(id){
		if(!this.isTheseusTurn()){
			if(this.wallCheck(id)){
				this.props.moves.moveMinotaur(id);
			}
			
			if(this.wallCheck(id)){
				this.props.moves.moveMinotaur(id);
			}
			this.props.events.endTurn();
		}
	}
	
	wallCheck(id)
	{
		if(this.isTheseusTurn()){
			switch(id){
				case(0):
					if((this.props.G.theseusRow - 1) > -1){
						if(this.props.G.cells[(this.props.G.theseusPos - boardWidth)] !== this.props.G.wallSym){
							return true;
						}
					}
					break;
				case(1):
					if((this.props.G.theseusCol + 1) < boardWidth+1){
						if(this.props.G.cells[(this.props.G.theseusPos + 1)] !== this.props.G.wallSym){
							return true;
						}
					}
					break;
				case(2):
					if((this.props.G.theseusRow + 1) < boardHeight+1){
						if(this.props.G.cells[(this.props.G.theseusPos + boardWidth)] !== this.props.G.wallSym){
							return true;
						}
					}
					break;
				case(3):
					if((this.props.G.theseusCol - 1) > -1){
						if(this.props.G.cells[(this.props.G.theseusPos - 1)] !== this.props.G.wallSym){
							return true;
						}
					}
					break;
				default:
					break;
			}
			
			return false;
		}
		
		switch(id){
				case(0):
					if((this.props.G.minotaurRow - 1) > -1){
						if(this.props.G.cells[(this.props.G.minotaurPos - boardWidth)] !== this.props.G.wallSym){
							return true;
						}
					}
					break;
				case(1):
					if((this.props.G.minotaurCol + 1) < boardWidth+1){
						if(this.props.G.cells[(this.props.G.minotaurPos + 1)] !== this.props.G.wallSym){
							return true;
						}
					}
					break;
				case(2):
					if((this.props.G.minotaurRow + 1) < boardHeight+1){
						if(this.props.G.cells[(this.props.G.minotaurPos + boardWidth)] !== this.props.G.wallSym){
							return true;
						}
					}
					break;
				case(3):
					if((this.props.G.minotaurCol - 1) > -1){
						if(this.props.G.cells[(this.props.G.minotaurPos - 1)] !== this.props.G.wallSym){
							return true;
						}
					}
					break;
				default:
					break;
			}
			
			return false;
	}

	
	//Main engine for rendering the board.
	render() {
		let message = ''
		if(this.props.ctx.gameover) {
			message = <div>Winner: {this.props.ctx.gameover}</div>;
		}
		else if(this.isTheseusTurn()) {
			message = <div> Current Player: Theseus</div>;
		}
		else {
			message = <div> Current Player: Minotaur</div>;
		}
		
		const cellStyle = {
			border: '1px solid #555',
			width: '50px',
			height: '50px',
			lineHeight: '50px',
			textAlign: 'center',
		};
		
		let tbody =[];
		for (let i = 0; i < boardHeight; i++) {
			let cells=[]
			for(let j=0;j<boardWidth;j++) {
				const id = boardWidth * i + j;
				cells.push(
					<td style={cellStyle} key={id}>
						{this.props.G.cells[id]}
					</td>
				);
			}
			tbody.push(<tr key={i}>{cells}</tr>);
		}
		
		return(
			<div>
				<table id="board">
					<tbody>{tbody}</tbody>
				</table>
				
				<h1>Theseus Controls</h1>
				<button onClick={()=> this.moveTheseusButton(0)}>N</button>
				<button onClick={()=> this.moveTheseusButton(1)}>E</button>
				<button onClick={()=> this.moveTheseusButton(2)}>S</button>
				<button onClick={()=> this.moveTheseusButton(3)}>W</button>
				<h1>Minotaur Controls</h1>
				<button onClick={()=> this.moveMinotaurButton(0)}>N</button>
				<button onClick={()=> this.moveMinotaurButton(1)}>E</button>
				<button onClick={()=> this.moveMinotaurButton(2)}>S</button>
				<button onClick={()=> this.moveMinotaurButton(3)}>W</button>
				
				{message}
			</div>
		);
		
	}

};
