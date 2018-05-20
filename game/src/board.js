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
		var Maze = newMaze(boardWidth,boardHeight);
		for(let i = 0; i < Maze.length; i++){
			for(let j = 0; j < Maze[i].length; j++){
				const id = boardWidth * i + j;
				const walls = Maze[i][j];
				this.updateWalls(id,walls);
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
	
	getRandInt(minIn,maxIn){
		return Math.floor(Math.random() * (maxIn-minIn)) + minIn;
	}
	
	deleteRandomWalls(numberOfWalls){
		//Choose a cell that isn't one of the outside walls,
		for(let x = 0; x<numberOfWalls; x++){
			let randRow = this.getRandInt(1,boardHeight-1);
			let randCol = this.getRandInt(1,boardWidth-1);
			let randCell = randRow*boardWidth + randCol;
			
			//To show which walls were deleted.
			//this.props.G.cells[randCell].setDisplay("D");
			
			//From the existing walls choose a random one to delete.
			let wallList = [];
			let newWallList = [];
			for(let x =0;x<3;x++){
				if(this.props.G.cells[randCell].walls[x] === 1){
					wallList.push(x);
				}
				newWallList.push(this.props.G.cells[randCell].walls[x]);
			}
			//console.log("Length:" + wallList.length);
			let randWall = this.getRandInt(0,wallList.length);
			newWallList[randWall] = 1;
			
			this.updateWalls(randCell,newWallList);
			
			
			//Find neighboring cell.
			
			let neighborCell = null;
			let neighborWall = null;
			switch(randWall){
				case(0):
					neighborCell = randCell - boardWidth;
					neighborWall = 2;
					break;
				case(1):
					neighborCell = randCell + 1;
					neighborWall = 3;
					break;
				case(2):
					neighborCell = randCell + boardWidth;
					neighborWall = 0;
					break;
				case(3):
					neighborCell = randCell - 1;
					neighborWall = 1;
					break;
				default:
					break;
				
			}

			let neighborWallList = [];
			for(let x =0;x<3;x++){
				neighborWallList.push(this.props.G.cells[neighborCell].walls[x]);
			}
			
			neighborWallList[neighborWall] = 1;
			
			this.updateWalls(neighborCell,neighborWallList);
		}
	}
	
	
	//Given a cell id, returns an array of cells that can be seen
	getLineOfSight(id){
		//start with an empty list
		let cellList = [];
		//you can always see where you're standing
		cellList.push(id);
		
		//Check each direction
		for(let x = 0; x<3;x++){
			let noWall = true;
			let currentCell = id;
			
			
			while(noWall){
				if(this.props.G.cells[currentCell].walls[x] === 1){
					
					switch(x){
					case(0):
						currentCell = currentCell - boardWidth;
						break;
					case(1):
						currentCell = currentCell + 1;
						break;
					case(2):
						currentCell = currentCell + boardWidth;
						break;
					case(3):
						currentCell = currentCell - 1;
						break;
					default:
						break;
					}
					
					cellList.push(currentCell);
				}
				else{
					noWall = false;
				}
			}
		}
		
		return cellList;
	}


	//////////////////////////////////////////////////////////////////////////
	//Above: Functions.
	//
	//Below: Things ran on start.
	//////////////////////////////////////////////////////////////////////////
	
	
	//For actions needed to be done after the board renders.
	componentDidMount(){
		
		this.generateMaze();
		
		let numberOfWallsToDelete = Math.round((boardWidth*boardHeight)/10);
		this.deleteRandomWalls(numberOfWallsToDelete);
		
		//Call removeWalls on all cells.
		//Might need to add this to a componentDidUpdate if walls ever change mid-game.
		for (let i = 0; i < boardHeight; i++) {
			for(let j=0;j<boardWidth;j++) {
				const id = boardWidth * i + j;
				this.removeWalls(id);
			}
		}
		
		
	}

	
	//Main engine for rendering the board.
	render() {
		//Message for gameover and current turn.
		let message = ''
		if(this.props.ctx.gameover) {
			message = 
			<div>
				Winner: {this.props.ctx.gameover}
			</div>;
		}
		else if(this.isTheseusTurn()) {
			message = <div>
				<div>
					<div>
						Current Player: Theseus
					</div>
					<div>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveTheseusButton(0)}>N</button>
					</div>
					<div>
						<button style={{position:'relative',left:'35px',}} onClick={()=> this.moveTheseusButton(3)}>W</button>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveTheseusButton(1)}>E</button>
					</div>
					<div>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveTheseusButton(2)}>S</button>
					</div>
				</div>
			</div>;
		}
		else {
			message = 
			<div> 
				<div>
					<div>
						Current Player: Minotaur
					</div>
					<div>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveMinotaurButton(0)}>N</button>
					</div>
					<div>
						<button style={{position:'relative',left:'35px',}} onClick={()=> this.moveMinotaurButton(3)}>W</button>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveMinotaurButton(1)}>E</button>
					</div>
					<div>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveMinotaurButton(2)}>S</button>
					</div>
				</div>
			</div>;
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
				<div>
					<table id="board">
						<tbody>{tbody}</tbody>
					</table>
				
					<div>
						{message}
					</div>
				</div>
			</div>
		);
		
		
	}

};
