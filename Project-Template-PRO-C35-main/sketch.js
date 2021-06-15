
var balloon,balloonimg;
var database;
function preload(){
  bg=loadImage("cityImage.png")
  balloonimg=loadAnimation("hotairballoon1.png","hotairballoon1.png","hotairballoon1.png")
}
function setup() {
  database = firebase.database();
  createCanvas(1200,600);
  balloon=createSprite(200, 450, 70, 70);
  balloon.addAnimation("balloon",balloonimg)
  balloon.scale=0.5
  var balloonposition = database.ref('balloon/height');
  balloonposition.on("value", readPosition, showError);
}

function draw() {
  background(bg); 
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  } 
  drawSprites();
}
function writePosition(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}
function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}