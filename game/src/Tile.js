function Tile(displayIn){
	//Start with no walls.
	this.walls = [0,0,0,0];
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
