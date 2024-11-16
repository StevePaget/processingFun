let circleColour = 40;
let centreCircle = 120;
let outsideBorder = 900;
let baseAngle = 0;
let numHands = 24;
let centrex = 500;
let centrey = 500;
let handWeight = 5;
let handHue = 244;
let sizegap = (outsideBorder - centreCircle) / numHands;
let qmark;
let helpShow = false;

function isMouseInsideText(message, messageX, messageY) {
  const messageWidth = textWidth(message);
  const messageTop = messageY - textAscent();
  const messageBottom = messageY + textDescent();

  return mouseX > messageX && mouseX < messageX + messageWidth &&
    mouseY > messageTop && mouseY < messageBottom;
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  centrex = windowWidth/2;
  centrey = windowHeight/2;
  outsideBorder = min(windowWidth, windowHeight)-50;
  centreCircle = outsideBorder/6;
  sizegap = (outsideBorder - centreCircle) / numHands;
  frameRate(30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centrex = windowWidth/2;
  centrey = windowHeight/2;
  outsideBorder = min(windowWidth, windowHeight)-50;
  centreCircle = outsideBorder/6;
  sizegap = (outsideBorder - centreCircle) / numHands;
}

function drawCircles() {
  let sizegap = (outsideBorder - centreCircle) / numHands;
  for (let i = numHands; i >= 0; i--) {
    strokeWeight(10);
    stroke(circleColour);
    fill(20,20,30);
    circle(centrex, centrey, centreCircle + sizegap * i);
    noStroke();
    fill(200);
    noStroke();
    textAlign(CENTER);
    textFont("Consolas");
    textSize(15);
    text(pow(2,i),centrex,centrey - (centreCircle + sizegap * i)/2+4);
  }
}

function drawHands(diff) {
  strokeWeight(handWeight);
  let brightness = 10;
  for (let i = numHands; i >= 0; i--) {
    let l2 = (centreCircle + sizegap * i) / 2;
    let fullSecs = pow(2, i);
    let timepassed = diff / fullSecs;
    let angle = (PI / 180) * (360 * timepassed - 90);
    let vy2 = sin(angle) * l2;
    let vx2 = cos(angle) * l2;
    colorMode(HSB);
    stroke(handHue,90, brightness);
    brightness += 3;
    line(centrex, centrey, centrex + vx2, centrey + vy2);
  }
}

function mouseClicked(){
  if (20 <= mouseX && mouseX <= 90 && mouseY > windowHeight-80 && mouseY<windowHeight-30) {
    helpShow = !helpShow;
  }
  if (helpShow && isMouseInsideText("https://somethingorotherwhatever.com/",110,windowHeight-40)){
    window.open('https://somethingorotherwhatever.com/', '_blank');
  }
}

function draw() {
  let now = new Date();
  let startOfyear = new Date(now.getFullYear(),0,1,0,0,0);
  let timetaken = now-startOfyear;
  origindate = new Date(now.getFullYear()+1,0,1,0,0,0);
  diff = (now.getTime() - (origindate.getTime()-16777216*40000)) / 1000;
  background(20,20,30);
  drawCircles();
  textAlign(LEFT)
  if (timetaken<20000){
    diff = 0;
    handWeight = 5 + timetaken/500;
    handHue = (244 + timetaken/10)%255
    text("Happy New Year. Enjoy this peaceful moment",50,50);
  } else if (timetaken<40000) {
    handWeight = 5 + timetaken/500;
    handHue = (244 + timetaken/10)%255
    diff = 0;
    text("I'm about to reset. Hold on, there's going to be a jump.",10,50);
  } else {
    handWeight = 5;
    handHue = 244;
  }
  drawHands(diff);
  textSize(24);
  text("❔", 50, windowHeight-50 );
  if (helpShow) {
      fill(255);
      rect(100,windowHeight-100,550,90);
      noStroke();
      textSize(20);
      fill(0);
      text("Adapted from an idea by Christian Lawson-Perfect.",110,windowHeight-60);
      if (isMouseInsideText("https://somethingorotherwhatever.com/",110,windowHeight-40)){
        cursor(HAND);
        fill(0, 200, 255);
      } else {
        cursor(ARROW);
        fill(244,255,100);
      }
      text("https://somethingorotherwhatever.com/",110,windowHeight-40);
  }
}
