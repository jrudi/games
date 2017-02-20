var h=600;
var w=420;
var emptyballs = [];
var balls = [];
var boxes = [];
var boxSize = 60;
var dir;
var magVel = 7;
var level = 5;
var levelready = false;

function setup() {
	var pos = createVector(200,540); 
	createCanvas(w,h);
	for (var i = 0; i < level; i++) {
			emptyballs.push(new Ball(pos.copy(),createVector(0,0)));
		}
	for (var i = 0; i < 1; i++) {
		boxes.push(new Box(2,1,2));
		boxes.push(new Box(2,2,3));
	}
}

function draw() {
	
	drawBackground();
	drawBoxes();
	if(levelready){
	if(emptyballs.length!=0&&frameCount%10==0){
		emptyballs[emptyballs.length-1].vec = dir.copy();
		balls.push(emptyballs.pop());
		console.log(balls[balls.length-1].vec);
	}
	}else{
		drawAimLine();
	}
	drawBalls();
}

function drawAimLine(){
	if(mouseIsPressed){
		stroke(255);
		strokeWeight(3);
		if(540-(mouseY-540)<500)
		line(200,540,200-(mouseX-200),540-(mouseY-540));
	}
}

function drawBackground(){
	background(0);
	stroke(255);
	line(0,h*0.9,w,h*0.9);
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

function keyPressed() {
	if (keyCode === LEFT_ARROW) {

	} else if (keyCode === RIGHT_ARROW) {

	}else if (keyCode === UP_ARROW) {

	}else if (keyCode === DOWN_ARROW) {

	}
}

function findDir(){
	dir = createVector(random(-1,1),random(-1,0));
}

function mouseReleased(){
	if(!levelready){
		dir = createVector(200-mouseX,540-mouseY);
		dir.setMag(magVel);

		levelready = true;
	}
}