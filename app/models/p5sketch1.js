import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function App() {
  // create a reference to the container in which the p5 instance should place the canvas
  const p5ContainerRef = useRef();

  useEffect(() => {
    // On component creation, instantiate a p5 object with the sketch and container reference 
    const p5Instance = new p5(sketch, p5ContainerRef.current);

    // On component destruction, delete the p5 instance
    return () => {
      p5Instance.remove();
    }
  }, []);

  return (
    <div ref={p5ContainerRef} />
  );
}

function sketch(p) {

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
      p.circle(this.pos.x, this.pos.y, this.r * 2);
      if (this.pos.y > 400 - this.r && this.vel.y > 0) {
        this.pos.y = 400 - this.r
        this.vel.y *= -1
      }
      if (this.pos.x > 400 - this.r) {
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

  function stop() {
    if (mode === 'loop') {
      mode = 'noLoop'
      p.noLoop()
    } else {
      mode = 'loop'
      p.loop()
    }
  }
  startButton = p.createButton('▶');
  startButton.size(50,30)
  startButton.style('background-color', p.color(128, 255, 255)); 
  stopButton = p.createButton('◾');
  stopButton.size(50,30)
  stopButton.style('background-color', p.color(255, 128, 255)); 

  p.setup = function() {
    const canvas = p.createCanvas(400, 400);
    canvas.parent('p5-container')
    mode = 'loop'
    p.loop()

    // startButton = p.createButton('▶');
    // startButton.style('background-color', p.color(255, 255, 255)); 
    // stopButton = p.createButton('◾');
    // stopButton.style('background-color', p.color(255, 255, 255)); 

    p.background(200);
    gravity = p.createVector(0, 0.1);
    dragC = 0.00;

    // Set functions to call when the buttons are pressed.
    startButton.mousePressed(p.setup);
    stopButton.mousePressed(stop)

    for (let i = 0; i < 50; i++) {
      let pt = p.createVector(p.random(0, 400), 0);
      let v = p5.Vector.random2D();
      nodes[i] = new Mover(pt, v, p.random(1, 3));
    }
  }

  p.draw = function() {
    p.background(0);

    p.noStroke();
    p.fill(128, 230);
    p.rect(0, 250, 400, 150);

    p.stroke(255);
    let c = p.color(255, 255, 255, 102);
    p.fill(c);

    nodes.forEach(function (node) {
      node.applyForce(p5.Vector.mult(gravity, node.mass))
      if (node.pos.y > 250) {
        let dragF = p5.Vector.setMag(node.vel, 1);
        let speedSq = node.vel.mag()
        dragF.setMag(-1 * dragC * speedSq * speedSq)
        node.applyForce(dragF)
      }
      node.move();
    })
  }
}