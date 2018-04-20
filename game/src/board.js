import React from 'react';
import {boardWidth,boardHeight} from './constants';

export class TheseusBoard extends React.Component {
	
	moveTheseusButton(id){
		if(this.isTheseusTurn()){
			this.props.moves.moveTheseus(id);
			this.props.events.endTurn();
		}
	}
	
	isTheseusTurn()
	{
		if(this.props.ctx.currentPlayer==='0'){
			return true;
		}
		
		return false;
	}
	
	moveMinotaurButton(id){
		if(!this.isTheseusTurn()){
			this.props.moves.moveMinotaur(id);
			this.props.events.endTurn();
		}
	}

	
	
	render() {
		let winner = ''
		if(this.props.ctx.gameover !== null) {
			winner = <div>Winner: {this.props.ctx.gameover}</div>
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
				const id = boardHeight * i + j;
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
				<button key={0} onClick={()=> this.moveTheseusButton(0)}>N</button>
				<button key={1} onClick={()=> this.moveTheseusButton(1)}>E</button>
				<button key={2} onClick={()=> this.moveTheseusButton(2)}>S</button>
				<button key={3} onClick={()=> this.moveTheseusButton(3)}>W</button>
				<h1>Minotaur Controls</h1>
				<button key={0} onClick={()=> this.moveMinotaurButton(0)}>N</button>
				<button key={1} onClick={()=> this.moveMinotaurButton(1)}>E</button>
				<button key={2} onClick={()=> this.moveMinotaurButton(2)}>S</button>
				<button key={3} onClick={()=> this.moveMinotaurButton(3)}>W</button>

				{winner}
			</div>
		);
		
	}

};
