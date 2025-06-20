function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

// The Smoke object is unchanged.
var Smoke = function(x, y) {
  this.x = x;
  this.y = y;
};
Smoke.prototype.move = function(){
  this.x -= 1;
  this.y -= 1;
};
Smoke.prototype.draw = function(){
  fill(40, 40, 40, 100);
  noStroke();
  ellipse(this.x, this.y, 10, 10);
};

let angle = 0;
let smokes = [];

function draw() {
  background(200, 230, 255);
  angle += 2;

  // --- Boat Parameters ---
  let cx = 300;   // boat center x
  let cy = 300;   // boat center y
  let boatAngle = -5 - sin(angle) * 5; // rotation in degrees
  let boatHeight = sin(angle) * 30;    // vertical bob

  // --- Draw and Update Smoke ---
  // Draw smoke first so the boat appears in front of it.
  for (let i = 0; i < smokes.length; i++) {
    smokes[i].move();
    smokes[i].draw();
  }

  // 1. Define the boat's center as a vector.
  let centerPos = createVector(cx, cy);
  
  // 2. Define the chimney top's position relative to the boat's center.
  // This includes the vertical bobbing.
  let chimneyOffset = createVector(-85, -150 - boatHeight);

  // 3. Rotate the offset vector by the boat's angle.
  // The p5.Vector.rotate() function requires the angle in RADIANS.
  chimneyOffset.rotate(boatAngle);

  // 4. Add the rotated offset to the boat's center to get the final position.
  let smokePos = p5.Vector.add(centerPos, chimneyOffset);

  // 5. Emit a new smoke particle at the calculated position.
  if (random(100) > 95){
    if (smokes.push(new Smoke(smokePos.x, smokePos.y)) > 30){
      smokes.splice(0, 1); // limit to 30 puffs
    }
  }


  // --- Draw Boat ---
  push();
  translate(cx, cy);
  rotate(boatAngle);

  fill(155, 0, 0);
  rect(-100, -120 - boatHeight, 70, 70); // cabin
  fill(255);
  quad(-150, -50 - boatHeight, 150, -50 - boatHeight, 100, 50 - boatHeight, -100, 50 - boatHeight); // body
  fill(200);
  ellipse(-65, -80 - boatHeight, 40, 40); // window
  rect(-90, -150 - boatHeight, 10, 30); // chimney
  pop();

  // --- Draw Water ---
  fill(0, 0, 200);
  noStroke();
  for (let bx = 0; bx < 600; bx += 2){
    rect(bx, 310 + sin(angle + bx) * 15, 2, 400);
  }

  frameRate(70);
}
