
function Boxes(gameSize){
	this.score = 0;
	this.gameSize = gameSize;
	this.mat = new Array(gameSize);
	this.boardFull=false;
	

	this.build = function(){
		for (var i = 0 ; i < this.mat.length ; i++) {
			this.mat[i] = new Array(gameSize);
			for (var j = 0 ; j < this.mat[0].length ; j++) {
				this.mat[i][j]=0;	
			} 
		}
	}

	this.show = function(){
		var s;
		for (var i = 0 ; i < this.mat.length ; i++) {
			s = "";
			for (var j = 0 ; j < this.mat.length ; j++) {
				s+= " " + str(this.mat[i][j]);
				//console.log(this.mat[i][j]);
			} 
			console.log(s);
		}
	}

	this.moveUp = function(){
		this.rotate();
		this.rotate();
		this.rotate();
		this.moveLeft();
		this.rotate();
	}

	this.moveDown = function(){
		this.rotate();
		this.moveLeft();
		this.rotate();
		this.rotate();
		this.rotate();
	}

	this.moveRight = function(){
		this.rotate();
		this.rotate();
		this.moveLeft();
		this.rotate();
		this.rotate();
	}

	this.moveLeft = function(){
		this.boardFull=true;
		for (var i = 0 ; i < this.mat.length ; i++) {
			var merge = true;
			
			for (var j = 0 ; j < this.mat.length ; j++) {
				var k=1;
				if (this.mat[i][j]==0){
					this.boardFull=false;
					while(j+k<this.mat.length){
						if(this.mat[i][j+k]==0){
							k++;
						}else{
							this.mat[i][j]=this.mat[i][j+k];
							this.mat[i][j+k] = 0;
							break;
						}
					}
				}else{
					while(j+k<this.mat.length){
						if(this.mat[i][j+k]==0){
							k++;
						}else{
							if(this.mat[i][j]==this.mat[i][j+k]){
								if(merge){
									this.mat[i][j]*=2;
									this.score+=this.mat[i][j];
									this.mat[i][j+k]=0;
									merge=false;
								}
								break;
							}else{
								k++;
							}
						}
					}
				}				
			}
		} 
	}

	this.rotate = function(){
		var newArray = [];
    	for(var i = 0; i < this.mat.length; i++){
        	newArray.push([]);
    	}

    	for(var i = 0; i < this.mat.length; i++){
        	for(var j = 0; j < this.mat[i].length; j++){
            	newArray[j].push(this.mat[i][j]);
        	}
    	}

	    this.mat = newArray;
    	for (var i = 0; i < this.mat.length; i++) {
    		this.mat[i].reverse();
    	}
	}

	this.createNewBlock = function(){
		if(!this.boardFull){
			var r = random(1);
			
			while(true){
				var n1 = this.getRandomInt(0,this.gameSize);
				var n2 = this.getRandomInt(0,this.gameSize);
			
				if(this.mat[n1][n2]==0){
					this.mat[n1][n2]=r>0.9?4:2;
					break;
				}
			}
		}
	}


	this.getRandomInt = function(min, max) {
  		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min)) + min;
	}

}


