var lineDist = 4;

function Box(n,c,r){
	this.col = c;
	this.row = r;
	this.num = n;
	this.active = true;


	this.contact = function(ball){
		this.num--;
		if(this.num==0){
			this.active = false;
		}
	}

	this.hasContact = function(ball){
		var topY = boxSize*this.row;
		var bottomY =boxSize*(this.row+1);
		var leftX = boxSize*this.col;
		var rightX = boxSize*(this.col+1);
		var ballX = ball.pos.x;
		var ballY = ball.pos.y;

		if(Math.abs(ballY-bottomY)<lineDist||Math.abs(topY-ballY)<lineDist){
			if(ballX>leftX&&ballX<rightX){
				ball.vec.y*=-1;
				this.contact();
				ball.travel();
				return true;
			}
		}else if(Math.abs(ballX-leftX)<lineDist||Math.abs(rightX-ballX)<lineDist){
			if(ballY>topY&&ballY<bottomY){
				ball.vec.x*=-1;
				this.contact();
				ball.travel();
				return true;
			}
		}
		return false;
	}

}