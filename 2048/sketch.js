var sz = 200;
var sqz = 20;
var textsz = 16;
var gameSize = 4;
var mat;
var para;
var colors=[
238, 228, 218, 	//0
186, 174, 161,	//2
232, 188, 141,	//4
242, 177, 121,	//8
245, 149, 99,	//16
246, 124, 95,	//32
246, 94, 59,	//64
237, 207, 114		//128+
];

function setup() {
	createCanvas(sz,sz);
	mat = new Boxes(gameSize);
	mat.build();
	mat.createNewBlock();
	para = createP();
	createP().html("<a href='index.html'>Go Back</a>");

}

function draw() {
	//background(0);
	textSize(textsz);
	for (var i = mat.mat.length - 1; i >= 0; i--) {
		for (var j = mat.mat[i].length - 1; j >= 0; j--) {

			var num = mat.mat[i][j];
			if(num!=0){
				num = floor(Math.log2(num));
				num = num>7?7:num;
			}

			fill(colors[num*3+0],colors[num*3+1],colors[num*3+2]);
			//rect(0,0,width/gameSize,height/gameSize);
			rect(j*width/gameSize,i*height/gameSize,width/gameSize,height/gameSize);
			if(frameCount==10){
				console.log(colors[num*3+0],colors[num*3+1],colors[num*3+2]);
			}
			var xpos = j*width/gameSize + width/(gameSize*4);
			var ypos = i*height/gameSize + 3*height/(gameSize*4);
			fill(0);
			strokeWeight(1);

			text(mat.mat[i][j],xpos,ypos);
		}
		
	}
	

	stroke(255);
	strokeWeight(5);

	for(var i=0;i<gameSize;i++){
		line(height/gameSize*i, 0,height/gameSize*i, width);
		line(0, width/gameSize*i,height, width/gameSize*i);

	}
	if(!mat.running){
		para.html('Your final Score is ' + mat.score + '. Press Enter to Restart!');
	}else{
		para.html(mat.score);

	}
}



function keyPressed() {
	if(mat.running){
		if (keyCode === LEFT_ARROW) {
			mat.moveLeft();
			mat.createNewBlock();
		} else if (keyCode === RIGHT_ARROW) {
			mat.moveRight();
			mat.createNewBlock();
		}else if (keyCode === UP_ARROW) {
			mat.moveUp();
			mat.createNewBlock();
		}else if (keyCode === DOWN_ARROW) {
			mat.moveDown();
			mat.createNewBlock();
		}
	}else{
		if(keyCode === ENTER){
			mat.build();
			mat.score = 0;
			mat.running = true;
}
	}
}
