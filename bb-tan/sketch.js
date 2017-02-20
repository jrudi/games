var numRows = 11;
var numCols = 7;
var boxSize = 60;

var h = numRows*boxSize;
var w = numCols*boxSize;

var bottomLine = h-boxSize; 
var topLine = boxSize;
var pos = w/2;
var newPos = pos;

var numBalls = 1;
var emptyballs = [];
var balls = [];
var boxes = [];

var dir;
var magVel = 7;
var maxAngle = bottomLine-50;
var firstDown = false;

var level = 5;
var levelready = false;

function setup() {
	
	createCanvas(w,h);

	init();	
}

function draw() {
	
	drawBackground();
	drawBoxes();
	if(levelready){
		if(emptyballs.length!=0&&frameCount%10==0){
			emptyballs[emptyballs.length-1].vec = dir.copy();
			balls.push(emptyballs.pop());

		}else if(emptyballs.length==0&&balls.length==0){
			levelready=false;
			for (var i = 0; i < boxes.length; i++) {
				boxes[i].row++;
			}
		

			createNewBlocks();

			if(boxes[0].row<numRows-2){
				level++;
				pos = newPos;
				firstDown = false;
				var vv = createVector(pos,bottomLine); 

				for (var i = 0; i < level; i++) {
					emptyballs.push(new Ball(vv.copy(),vv.copy()));
				}
				console.log(emptyballs.length);
			}

		}

	}else{
		drawAimLine();
	}
	drawBalls();
}

function init(){
	var vv = createVector(w/2,bottomLine); 
	for (var i = 0; i < level; i++) {
		emptyballs.push(new Ball(vv.copy(),createVector(0,0)));
	}
	for (var i = 0; i < 1; i++) {
		boxes.push(new Box(2,1,2));
		boxes.push(new Box(2,2,3));
	}
}

function createNewBlocks(){
	var ll = [];
	for (var i = 0; i < numCols; i++) {
		ll.push(i);
	}
	var x = floor(random(numCols));
	var exists = false;
	console.log(x);


	while(x>0){
		ll[x]=-1;
		x--;
	}
	console.log(ll);

	for (var i = 0; i < ll.length; i++) {
		if(ll[i]!=-1){
			boxes.push(new Box(level,ll[i],2));
		}
	}
}


function drawAimLine(){
	if(mouseIsPressed){
		stroke(255);
		strokeWeight(3);
		if(bottomLine-(mouseY-bottomLine)<maxAngle)
			line(pos,bottomLine,pos-(mouseX-pos),bottomLine-(mouseY-bottomLine));
	}
}

function drawBackground(){
	background(0);
	stroke(255);
	line(0,h*0.9,w,h*0.9);
	fill(255,0,0);
	ellipse(newPos,bottomLine,5,5);
}

function drawBoxes(){
	textSize(32);
	stroke(255);



	for (var i = boxes.length-1; i >= 0; i--) {
		if(boxes[i].active){
			strokeWeight(3);
			noFill();
			rect(boxes[i].col*boxSize,boxes[i].row*boxSize,boxSize,boxSize);
			strokeWeight(1);
			fill(255);

			text(boxes[i].num,(boxes[i].col+0.25)*boxSize,(boxes[i].row+0.66)*boxSize);
		}else{
			boxes.pop(i);
		}
	}
}

function drawBalls(){
	for (var i = balls.length - 1; i >= 0; i--) {
		if(!balls[i].active){
			if(!firstDown){
				newPos = balls[i].pos.x;
				firstDown = true;
			}
			balls.splice(i, 1);

		}else{
			ellipse(balls[i].pos.x,balls[i].pos.y,10,10);
			balls[i].travel();
			for (var j = boxes.length -1; j >= 0; j--) {

				if(boxes[j].hasContact(balls[i])&&!boxes[j].active){
					boxes.splice(j, 1);
				}
			}
		}

	}
}

function mouseReleased(){
	if(!levelready){
		dir = createVector(pos-mouseX,bottomLine-mouseY);
		dir.setMag(magVel);

		levelready = true;
	}
}