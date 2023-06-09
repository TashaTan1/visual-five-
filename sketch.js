/***************************************************************************************
*    Title: puddle of stars
*    Author: Sophia (fractal kitty)
*    Date: n.d.
*    Code version: 1.0
*    Availability: https://codepen.io/fractalkitty/pen/bGjOZvj
*
***************************************************************************************/

//variables
let five;
let sArray = []; 
let spectrum;
let waves;
let fft;
let t = 0;
let n = 100;
let timer = 5;
let button;

function preload() {
  userStartAudio();
  five = loadSound("FIVE.mp3"); 
}
function setup() {
  sArray = [];
  createCanvas(windowWidth, windowHeight);
  five.amp(0.7); 
  fft = new p5.FFT(); 
  spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length; i++) {
    sArray.push(new dots(i));
  }
  background(0, 0, 20);
}

function draw() {
  translate(width / 2, height / 2);
 

  t += 0.001;
  if (!five.isPlaying()) {
    five.play();
  }

  background(0, 0, 9, 20);
  soundProcess();
//timer
  if (frameCount % 60 == 0 && timer > 0) {
    
    timer--;
  }
  //  console.log(timer);
  if (timer == 0) {
    button = createButton("Carry on Listening");
    button.position(width/2 -200, height/2);
    button.mousePressed(function goToAnotherPage() {
      window.location.href =
        "https://tashatan1.github.io/visual-five-/";
    });
    button = createButton("Let's Breath");
    button.position(width/2 +80, height/2);
    button.mousePressed(function goToAnotherPage() {
      window.location.href =
        "https://tashatan1.github.io/let-s-breath/";
    });
  }
}

function soundProcess() {
  spectrum = fft.analyze();
  waves = fft.waveform();
  for (let i = 0; i < spectrum.length; i += 1) {
    sArray[i].display(spectrum[i] / 10, waves[i]);
  }
}
//animation for visual
class dots {
  constructor(i) {
    this.i = i;
    let c =
      (min(width, height) - (min(width, height) / spectrum.length) * i) * 0.5;
    this.L = random(-c, c);
    this.theta = random(-PI, PI);
    this.x = this.L * sin(this.theta);
    this.y = this.L * cos(this.theta);
    this.t = 1;
    this.dt = random(0.00002);
  }
  display(dt, w) {
    this.t += (10 * sin(this.dt + (abs(w / 100) + abs(dt / 10000)))) / 10;
    this.theta = TWO_PI * sin(this.t);
    this.x = this.L * sin(this.theta);
    this.y = this.L * cos(this.theta);
    fill(
      125 * sin((PI * cos(this.t)) / 4),
      355 * abs(sin(t / 2 + this.t)),
      355 * abs(sin(t / 2 + this.t)),
      50
    );

    if (this.i % 10 === 0) {
      push();
      fill(100, 200, 250, 1);
      circle(
        this.x * cos(this.t) + this.L * sin(this.t - this.L) * cos(t * this.dt),
        this.y * sin(this.t + t / 2) +
          this.L * cos(this.t + this.L) +
          this.L * this.t * tan(t * this.dt),
        this.x + this.L * sin(this.L / 100 + this.t)
      );
      pop();
    }
    circle(
      this.x * cos(this.t),
      this.y * sin(this.t + t / 2),
      1 + 10 * abs(sin(w + dt / 100))
    );
    let f = width / 2;
    noStroke();
  }
}
function mousePressed() {
  playBool = !playBool;
}
function keyPressed() {
  five.stop();
  setup();
  draw();
}
