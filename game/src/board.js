import React from 'react';
import {boardWidth,boardHeight} from './constants';
import { newMaze } from './mazegenerator';

export class TheseusBoard extends React.Component {
	
	//Launched by Theseus Controls, triggers Theseus move.
	moveTheseusButton(id){
		if(this.isTheseusTurn()){
			if(!this.wallCheck(id)){
				this.props.G.cells[this.props.G.theseusPos].scent = id;
				this.props.moves.moveTheseus(id);
				this.updateFogOfWar();
				this.props.events.endTurn();
			}
		}
	}

	theseusWait(){
		if(this.isTheseusTurn()){
			this.props.events.endTurn();
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
	
	//Launched by Minotaur Controls, triggers 1 Minotaur move.
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
		for(let x = 0; x<4;x++){
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

	setFogOfWar(id){
		//var cell = document.getElementById("Cell" + id);
		//cell.style.backgroundColor = 'black';
		this.props.G.cells[id].setDisplay("Blank");
	}

	removeFogOfWar(id){
		//var cell = document.getElementById("Cell" + id);
		//cell.style.backgroundColor = 'white';
		this.props.G.cells[id].setDisplay("");
	}

	setSeen(id){
		var cell = document.getElementById("Cell" + id);
		cell.style.backgroundColor = 'lightGrey';
	}

	//Return true if Theseus is in the Minotaur's LOS.
	doesMinotaurSeeTheseus(){
		let minotaurLOS = this.getLineOfSight(this.props.G.minotaurPos);
		for(let x = 0; x < minotaurLOS.length; x++){
			if(minotaurLOS[x] === this.props.G.theseusPos){
				return true;
			}
		}

		return false;
	}

	//Takes 2 moves into the direction of id. If a wall is hit, turn off minotaur rage.
	minotaurRage(direction){
		if(!this.isTheseusTurn()){
			if(!this.wallCheck(direction)){
				//console.log("Rage: " + direction)
				this.props.moves.moveMinotaur(direction);
				if(!this.wallCheck(direction)){
					this.props.moves.moveMinotaur(direction);
				}
				else{
					this.props.G.minotaurRageTrigger = false;
					this.props.G.minotaurRageDirection = -1;
				}
				this.props.events.endTurn();
			}
			else{
				this.props.G.minotaurRageTrigger = false;
				this.props.G.minotaurRageDirection = -1;
				this.props.events.endTurn();
			}
		}
	}

	directionToTheseus(id){
		//We need to check N/S before E/W
		if(id < this.props.G.theseusPos){
			
			//Check S
			for(let x=1;x<boardHeight+1;x++){
				let tempPos = (id+(x*boardWidth));
				//console.log("Checking: " + tempPos)
				if(tempPos === this.props.G.theseusPos){
					return 2;
				}
			}

			//Check E
			for(let x=0;x<boardWidth;x++){
				let tempPos = id + x - 1;
				//console.log("Checking: " + tempPos)
				if(tempPos === this.props.G.theseusPos){
					return 1;
				} 
			}
		}
		else{
			//Check N
			for(let x=1;x<boardHeight+1;x++){
				let tempPos = id - (x*boardWidth);
				if(tempPos === this.props.G.theseusPos){
					return 0;
				}
			}

			//Check W
			for(let x=0;x<boardWidth;x++){
				let tempPos = id - x - 1;
				//console.log("Checking: " + tempPos);
				if(tempPos === this.props.G.theseusPos){
					return 3;
				}
			}

		}

		//Error
		return -1;
	}

	//Chooses a random direction, prefers one that is not where you came from.
	chooseWanderDirection(previousDirection){
		let possibleDirections = [];
		let backwards = -1;
		switch(previousDirection){
			case(0):
				backwards = 2;
				break;
			case(1):
				backwards = 3;
				break;
			case(2):
				backwards = 0;
				break;
			case(3):
				backwards = 1;
				break;
			default:
				break;
		}
		for(let x=0;x<4;x++){
			if(!this.wallCheck(x)){
				possibleDirections.push(x);
			}
		}
		//console.log("Possible Directions: ");
		//console.log(possibleDirections);
		if(possibleDirections.length < 2){
			//console.log("Only 1 direction.")
			return possibleDirections[0];
		}
		else{
			let tempDirections = [];
			for(let x=0;x < possibleDirections.length;x++)
			{
				if(possibleDirections[x] !== backwards){
					tempDirections.push(possibleDirections[x]);
				}
			}
			let randDir = this.getRandInt(0,tempDirections.length);
			//console.log("Randomly chose: " + randDir);
			return tempDirections[randDir];

		}
	}

	//Checks if the target is within a circular range of the starting cell.
	areaCheck(startingCell,targetCell,range){
		if(range <=0 || startingCell <0 || startingCell > boardWidth*boardHeight || targetCell < 0 || targetCell > boardWidth*boardHeight ){
			return false;
		}

		for(let x = -range; x<=range;x++){
			for(let y = -range;y<=range;y++){
				let tempCell = startingCell + (x*boardWidth) + y;
				if(tempCell >=0 && tempCell <= boardWidth*boardHeight){
					if(tempCell === targetCell){
						return true;
					}
				}
			}
		}

		return false;
	}

	updateFogOfWar(){
		//Handling fog of war.
		for (let i = 0; i < boardHeight; i++) {
			for(let j=0;j<boardWidth;j++) {
				const id = boardWidth * i + j;
				var cell = document.getElementById("Cell" + id);
				if(cell.style.backgroundColor === "white"){
					this.setSeen(id);
				}
			}
		}

		//Clear theseus LOS
		let theseusLOS = this.getLineOfSight(this.props.G.theseusPos);
		for(let x = 0; x<theseusLOS.length;x++){
			let cell = theseusLOS[x]
			this.removeFogOfWar(cell);

		}
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

		//Set Fog of War on every unseen tile.
		for (let i = 0; i < boardHeight; i++) {
			for(let j=0;j<boardWidth;j++) {
				const id = boardWidth * i + j;
				this.setFogOfWar(id);
			}
		}

		//Clear fog from Theseus LOS
		let theseusLOS = this.getLineOfSight(this.props.G.theseusPos);
		for(let x = 0; x<theseusLOS.length;x++){
			let cell = theseusLOS[x]
			this.removeFogOfWar(cell);

		}

	}

	//For actions needed to be done every update.
	componentDidUpdate(){

		if(this.isTheseusTurn){
			if(this.doesMinotaurSeeTheseus() && !this.props.G.minotaurRageTrigger){
				console.log("Theseus seen.")
				this.props.G.minotaurRageTrigger = true;
				this.props.G.minotaurRageDirection = this.directionToTheseus(this.props.G.minotaurPos);
			}
		}

		if(!this.isTheseusTurn() && !this.props.ctx.gameover){
			//If currently Raging
			if(this.props.G.minotaurRageTrigger){
				console.log("Raging");
				this.minotaurRage(this.props.G.minotaurRageDirection);
			}
			//Minotaur Rage if he sees Theseus.
			else if((this.props.G.minotaurPos !== this.props.G.theseusPos) && this.doesMinotaurSeeTheseus()){
				console.log("Rage triggered.");
				this.props.G.minotaurRageTrigger = true;
				this.props.G.minotaurRageDirection = this.directionToTheseus(this.props.G.minotaurPos);
				this.minotaurRage(this.props.G.minotaurRageDirection);
			}
			//If there's a scent.
			//else if(this.props.G.cells[this.props.G.minotaurPos].scent !== -1){
			//	console.log("Following scent.");
			//	this.moveMinotaurButton(this.props.G.cells[this.props.G.minotaurPos].scent);
			//}
			//Otherwise wander.
			else{
				console.log("Wandering");
				this.props.G.minotaurWanderDirection = this.chooseWanderDirection(this.props.G.minotaurWanderDirection);
				this.moveMinotaurButton(this.props.G.minotaurWanderDirection);
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
		else{
			message = <div>
				<div>
					<div>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveTheseusButton(0)}>N</button>
					</div>
					<div>
						<button style={{position:'relative',left:'35px',}} onClick={()=> this.moveTheseusButton(3)}>W</button>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveTheseusButton(1)}>E</button>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.theseusWait()}>Wait</button>

					</div>
					<div>
						<button style={{position:'relative',left:'100px',}} onClick={()=> this.moveTheseusButton(2)}>S</button>
					</div>
				</div>
			</div>;
		}

		let warning = ''
		if(this.areaCheck(this.props.G.theseusPos,this.props.G.minotaurPos,1)){
			warning =
			<div>
				<p>You hear the minotaur VERY CLOSE BY.</p>
			</div>
		}
		else if(this.areaCheck(this.props.G.theseusPos,this.props.G.minotaurPos,2)){
			warning =
			<div>
				<p>You hear stomping nearby.</p>
			</div>
		}
		else{
			warning = ''
		}

		
		//Default cell style.
		const cellStyle = {
			border: '2px solid #555',
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
						<img src={require('./' + this.props.G.cells[id].display + '.jpg')} alt="Test" height = '50px' width = '50px'></img>

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
					<div>
						{warning}
					</div>
				</div>
			</div>
		);
		
		
	}

};
