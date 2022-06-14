const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  boat = new Boat(width-79, height - 60, 170, 170,-80);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();  
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();


  Matter.Body.setVelocity(boat.body,{x:-0.9, y:0})
  boat.display();
  
  showBoats();
// index number is location of spacific spot in the array that has the data
// i is defines here
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }
// balls is the box and balls.length is how many things can be stored in the box
// array holds data of ball so when you shoot ot goes to the array and copies the data in each section of the array
  cannon.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
    // if the ellement is present on a spacific index number (i) or not and return true or false value.
  if (ball) {
    ball.display();
  }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

// boats is the array
// if object is greater than 0 than it is present and function is given
function showBoats(){
  if (boats.length > 0){
    // if boat has covered some distance than create new boat
    // line 90 and 91 is random position givin to the new boat
    if (boats[boats.length-1].body.position.x<width-300 || boats[boats.length-1]===undefined){
      var positions=[-40,-60,-70,-20];
      var position=random(positions);
      boat = new Boat(width-79, height - 60, 170, 170,position);
  boats.push(boat);
    }
    // for loop is checking for multipul indexes 
    for (var i = 0; 1 < boats.length; i++){
      if (boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9, y:0});
        boats[i].display();
      }
    }
  }
else{
  boat = new Boat(width-79, height - 60, 170, 170,-80);
  boats.push(boat);
}
}

function collisionWithBoats (index) {
  for (var i=0; i < boats.length; i++){
 if (boats[i]!==undefined && balls[index]!==undefined){
   var collision = Matter.SAT.collides(balls[index].body,boats[i].body);
   if(collision.collided){
     boats[i].remove(i);
     Matter.World.remove(world, balls[index].body)
     delete balls[index]
   }
 }
  }
}