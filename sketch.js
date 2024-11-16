let circleColour = 200;
let centreCircle = 120;
let outsideBorder = 900;
let backColour = 255;
let baseAngle = 0;
let numHands = 17;
let centrex = 500;
let centrey = 500;
let sizegap = (outsideBorder - centreCircle) / numHands;
let origindate = new Date("1 Jan 2023, 00:00:00");

function setup() {
  createCanvas(windowWidth, windowHeight);
  centrex = windowWidth/2;
  centrey = windowHeight/2;
  frameRate(30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centrex = windowWidth/2;
  centrey = windowHeight/2;
  outsideBorder = min(windowWidth, windowHeight)-100;
  centreCircle = outsideBorder/6;
  sizegap = (outsideBorder - centreCircle) / numHands;
}

function drawCircles() {
  fill(backColour);
  strokeWeight(10);
  stroke(circleColour);
  let sizegap = (outsideBorder - centreCircle) / numHands;
  for (let i = numHands; i >= 0; i--) {
    circle(centrex, centrey, centreCircle + sizegap * i);
  }
}

function drawHands(diff) {
  strokeWeight(5);
  stroke(0);
  for (let i = numHands; i >= 0; i--) {
    let l2 = (centreCircle + sizegap * i) / 2;
    let fullSecs = pow(2, i);
    let timepassed = diff / fullSecs;
    let angle = (PI / 180) * (360 * timepassed - 90);
    let vy2 = sin(angle) * l2;
    let vx2 = cos(angle) * l2;
    line(centrex, centrey, centrex + vx2, centrey + vy2);
  }
}

function draw() {
  now = new Date();
  diff = (now - origindate) / 1000;
  //console.log(diff);
  background(backColour);
  drawCircles();
  drawHands(diff);
}
