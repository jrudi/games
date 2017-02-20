function Ball(p,d){
	this.pos = p;
	this.vec = d;
	this.active = true;

	this.travel = function(){
		this.pos.add(this.vec);
		if(this.pos.x<=0||this.pos.x>=width){
			this.vec.x*=-1;
		}else if(this.pos.y<0){
			this.vec.y*=-1;
		}else if(this.pos.y>height){
			console.log("lel");
			this.active = false;
		}
	}	
}