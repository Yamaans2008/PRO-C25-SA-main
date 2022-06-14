class Boat {
  constructor(x, y, width, height, boatPos) {
    this.body = Bodies.rectangle(x, y, width, height);
    // width is not defined but this.width is defined so to define width you use this.wodth = width; and same for height 
    this.width = width;
    this.height = height;

    this.image = loadImage("./assets/boat.png");
    this.boatPosition = boatPos;
    World.add(world, this.body);
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.boatPosition, this.width, this.height);
    pop();
  }
  // each index is each boats and there are 4 boats
  remove(index) {
    setTimeout(()=>{
      Matter.World.remove(world, boats[index].body)
    delete boats[index]
    },2000)
  }
}
