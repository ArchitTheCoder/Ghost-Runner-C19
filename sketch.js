var ghost, ghostRunning;

var ground, movingGround;

var climber, climberIMG, doorIMG, obstacle1Group, obstacle2Group;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sound;


function preload () {
  
  ghostRunning = loadAnimation("ghost-standing.png", "ghost-jumping.png")
  
  movingGround = loadImage("tower.png");
  
  climberIMG = loadImage("climber.png");
  doorIMG = loadImage("door.png");
  
  sound = loadSound("spooky.wav")
  
}

function setup() {
  createCanvas(600,600)
  
  ground = createSprite(300,300,10,10);
  ground.addImage(movingGround);
  ground.y = ground.height /2;
  ground.velocityY = 4;
  
  ghost = createSprite(300,300,10,10);
  ghost.addAnimation("running", ghostRunning);
  ghost.scale = 0.3;
  

  
  obstacle1Group = new Group();
  obstacle2Group = new Group();
}

function draw() {
  background(0);
  
  
  if (gameState === PLAY) {
    
    //sound.play();
    
    //movment
    if (keyDown(RIGHT_ARROW)) {
      ghost.velocityX = 2;
    }
     
    if (keyDown(LEFT_ARROW)) {
      ghost.velocityX = -2;
    }
       
    
    //Jumping and Gravity
    if (keyDown("space")) {
      ghost.velocityY = -11;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if (ground.y > 600){
      ground.y = 300;
    }
  
    if (ghost.y > 600 || ghost.isTouching(obstacle2Group)) {
      gameState = END;
    }
    
    
  } else if (gameState === END) {
    
    ground.velocityY = 0;
    ghost.visible = false;
    obstacle1Group.destroyEach();
    obstacle2Group.destroyEach();
    ground.visible = false;
    
    fill("red");
    textSize(40);
    text("Game Over", 200, 300)
  }
  
  
  
  
  
  

  
  

  
  obstacles(); 
  
  drawSprites();
}

function obstacles() {
  
  if (frameCount % 80 === 0) {
    
    var obstacle1 = createSprite(300, -60, 10, 10);
    obstacle1.x = Math.round(random(100, 500));
    obstacle1.velocityY = 4;
    
    obstacle1.addImage(doorIMG);
    obstacle1.lifetime = 100;
    
    var obstacle2 = createSprite(300, 0, 10, 10);
    obstacle2.x = obstacle1.x
    obstacle2.velocityY = 4;
    
    obstacle2.addImage(climberIMG);
    obstacle2.lifetime = 100;
    
    
    obstacle1Group.add(obstacle1);
    obstacle2Group.add(obstacle2);
    
  }
  
  
}