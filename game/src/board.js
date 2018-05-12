import React from 'react';
import {boardWidth,boardHeight} from './constants';
import { newMaze } from './mazegenerator';

export class TheseusBoard extends React.Component {
	
	//Launched by Theseus Controls, triggers Theseus move.
	moveTheseusButton(id){
		if(this.isTheseusTurn()){
			if(!this.wallCheck(id)){
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
			if(!this.wallCheck(id)){
				this.props.moves.moveMinotaur(id);
				if(!this.wallCheck(id)){
					this.props.moves.moveMinotaur(id);
				}
				this.props.events.endTurn();
			}
		}
	}
	
	//Removes the corresponding borders from cells with walls[side]=1.
	removeWalls(id){
		var cell = document.getElementById("Cell" + id);
		if(this.props.G.cells[id].walls[0] === 1){
			cell.style.borderTop = "0";
		}
		
		if(this.props.G.cells[id].walls[1] === 1){
			cell.style.borderRight = "0";
		}
		
		if(this.props.G.cells[id].walls[2] === 1){
			cell.style.borderBottom = "0";
		}
		
		if(this.props.G.cells[id].walls[3] === 1){
			cell.style.borderLeft = "0";
		}
	}
	
	//Given a cell id and a wall list, updates that cells walls.
	updateWalls(id,wallsIn){
		for(let x = 0; x < wallsIn.length;x++){
			this.props.G.cells[id].walls[x] = wallsIn[x];
		}
	}
	
	generateMaze(){
		var Maze = newMaze(boardHeight,boardWidth);
		for(let i = 0; i < Maze.length; i++){
			for(let j = 0; j < Maze[i].length; j++){
				const id = boardWidth * i + j;
				const walls = Maze[i][j];
				this.updateWalls(id,walls);
			}
		}
	}
	
	//For actions needed to be done after the board renders.
	componentDidMount(){
		
		this.generateMaze();
		
		//Call removeWalls on all cells.
		//Might need to add this to a componentDidUpdate if walls ever change mid-game.
		for (let i = 0; i < boardHeight; i++) {
			for(let j=0;j<boardWidth;j++) {
				const id = boardWidth * i + j;
				this.removeWalls(id);
			}
		}
		
	}
	
	wallCheck(id)
	{
		if(this.isTheseusTurn()){
			switch(id){
				case(0):
					if(this.props.G.cells[this.props.G.theseusPos].walls[0] === 0){
						return true;
					}
					break;
				case(1):
					if(this.props.G.cells[this.props.G.theseusPos].walls[1] === 0){
						return true;
					}
					break;
				case(2):
					if(this.props.G.cells[this.props.G.theseusPos].walls[2] === 0){
						return true;
					}
					break;
				case(3):
					if(this.props.G.cells[this.props.G.theseusPos].walls[3] === 0){
						return true;
					}
					break;
				default:
					break;
			}
			
			return false;
		}
		
		switch(id){
				case(0):
					if(this.props.G.cells[this.props.G.minotaurPos].walls[0] === 0){
						return true;
					}
					break;
				case(1):
					if(this.props.G.cells[this.props.G.minotaurPos].walls[1] === 0){
						return true;
					}
					break;
				case(2):
					if(this.props.G.cells[this.props.G.minotaurPos].walls[2] === 0){
						return true;
					}
					break;
				case(3):
					if(this.props.G.cells[this.props.G.minotaurPos].walls[3] === 0){
						return true;
					}
					break;
				default:
					break;
			}
			
			return false;
	}

	
	//Main engine for rendering the board.
	render() {	
		//Message for gameover and current turn.
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
		
		//Default cell style.
		const cellStyle = {
			border: '1px solid #555',
			width: '50px',
			height: '50px',
			lineHeight: '50px',
			textAlign: 'center',
		};
		
		//Creating the board from the cells.
		let tbody =[];
		for (let i = 0; i < boardHeight; i++) {
			let cells=[]
			for(let j=0;j<boardWidth;j++) {
				const id = boardWidth * i + j;
				cells.push(
					<td style={cellStyle} key={id} id={"Cell" + id}>
						{this.props.G.cells[id].display}
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
