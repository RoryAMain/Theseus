function Tile(displayIn){
	//Start with no walls.
	this.walls = [false,false,false,false];
	this.display = displayIn;
	
	this.getWalls = function(){
		return this.walls;
	}
	
	this.setWalls = function(wallsIn){
		this.walls = wallsIn;
	}
	
	this.getDisplay = function(){
		return this.display;
	}
	
	this.setDisplay = function(displayIn){
		this.display = displayIn;
	}
	
}

export{
	Tile
};
