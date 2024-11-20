class Mover {
  constructor(pos, vel, m) {
    this.pos = pos;
    this.vel = vel;
    this.mass = m;
    this.r = Math.sqrt(m) * 10;
  }
  applyForce(force) {
    const f = p5.Vector.div(force, this.mass) 
    this.vel.add(f);
  }
  move() {
    this.pos.add(this.vel)
    circle(this.pos.x, this.pos.y, this.r*2);
    if (this.pos.y > 400-this.r && this.vel.y > 0) {
      this.pos.y = 400 - this.r
      this.vel.y *= -1
    } 
    if (this.pos.x > 400-this.r) {
      this.pos.x = 400 - this.r
      this.vel.x *= -1;
    } else if (this.pos.x < this.r) {
      this.pos.x = 0 + this.r 
      this.vel.x *= -1;
    }
  }
}

let nodes = [];
let gravity;
let dragC;
let startButton;
let stopButton;
let mode = 'loop'

function stop () {
  if (mode === 'loop') {
    mode = 'noLoop'
    noLoop()
  } else {
    mode = 'loop'
    loop()
  }
}

function setup() {

  // createCanvas(400, 400);
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-container');
  
  mode = 'loop'
  loop()

  startButton = createButton('▶');
  startButton.position(150, 60);
  startButton.size(50, 40);
  stopButton = createButton('◾');
  stopButton.position(200, 60);
  stopButton.size(50, 40);

  background(200);
  gravity = createVector(0, 0.1);
  dragC = 0.00;
  
  // Set functions to call when the buttons are pressed.
  startButton.mousePressed(setup);
  stopButton.mousePressed(stop)

  for (let i=0; i < 50; i++){
    let p = createVector(random(0, 400), 0);
    let v = p5.Vector.random2D();
    nodes[i] = new Mover(p, v, random(1,3));
  }  
}

function draw() {
  background(0);

  noStroke();
  fill(128, 230);
  rect(0, 250, 400, 150);

  stroke(255);
  let c = color(255, 255, 255, 102);
  fill(c);
  
  nodes.forEach(function(node){
    node.applyForce(p5.Vector.mult(gravity, node.mass))
    if (node.pos.y > 250) {
      let dragF = p5.Vector.setMag(node.vel, 1);
      let speedSq = node.vel.mag()
      dragF.setMag(-1*dragC*speedSq*speedSq)
      node.applyForce(dragF)
    }
    node.move();
  } )
  
}