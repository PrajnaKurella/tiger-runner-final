var tiger, tigerRunning, tigerCollided;    
var hunter, hunterimg; 
var fire, fireimg; 
var bg, bgimg; 
var inGround; 
var obGroup; 
var gameState = "play"; 
var dieSound, jumpSound; 
var gameOver, gameOverImage;
var restart, restartImage;
var score = 0;

function preload(){
  //tigerRunning = loadAnimation("tiger1.png", "tiger2.png", "tiger4.png"); 
  tigerRunning = loadAnimation("tiger1.png", "tiger2.png","tigerNew4.png","tiger5.png","tiger6.png","tiger7.png"); 
  tigerCollided = loadImage("endTiger.png");
  bgimg = loadImage("newbg.png"); 
  hunterimg = loadImage("hunter.png"); 
  fireimg = loadImage("fire.png"); 
  dieSound = loadSound("die.mp3"); 
  jumpSound = loadSound("jump.mp3"); 
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("reset.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(width/4,height/2,100,100); 
  bg.addImage(bgimg);
  bg.scale = 3.2; 

  tiger = createSprite(800,680,0,0); 
  tiger.addAnimation("tigerRunning", tigerRunning); 
  tiger.addImage("tigerCollided",tigerCollided);
  tiger.scale = 2.2;
  tiger.debug = false; 
  tiger.setCollider("rectangle",0,0,100,60); 

  hunter = createSprite(300,680,0,0); 
  hunter.addImage("hunterimg", hunterimg); 
  hunter.scale = 0.8; 

  inGround = createSprite(width/2,800,width,2); 
  inGround.visible = false; 

  gameOver = createSprite(900,200);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;

  restart = createSprite(900,400);
  restart.addImage(restartImage);
  restart.scale = 0.6;
  restart.visible = false;

  obGroup = new Group(); 
}

function draw() {
  background(255,255,255); 

  if(gameState === "play"){
    restart.visible = false;
    gameOver.visible = false;

    score = score + round(getFrameRate()/60);

    bg.velocityX = -6;
 
    if(bg.x < 0){
      bg.x = bg.width/2;
    }
    console.log(tiger.y);
    if(keyDown("space") && tiger.y > 650){
      tiger.velocityY = -25; 
      jumpSound.play(); 
    }
    tiger.velocityY = tiger.velocityY + 0.8; 

    if(hunter.isTouching(obGroup)){
      hunter.velocityY = -15; 
    }
    hunter.velocityY = hunter.velocityY + 0.8; 

    if(tiger.isTouching(obGroup)){
      gameState = "end"; 
      dieSound.play(); 
    }
    spawnFire(); 
  }

  if(gameState === "end"){
    gameOver.visible = true;
    restart.visible = true;
    bg.velocityX = 0; 
    tiger.velocityY = 0; 
    hunter.velocityY = 0; 
    obGroup.setLifetimeEach(-1); 
    obGroup.setVelocityXEach(0); 
    hunter.x = tiger.x; 
    tiger.changeImage("tigerCollided",tigerCollided); 

    if(mousePressedOver(restart)){
      reset();
    }
  }
  tiger.collide(inGround); 
  hunter.collide(inGround); 
 
  drawSprites();

  fill("red"); 
  textSize(35); 
  text("Score : " + score, 1500,100); 
  
}

function spawnFire(){
  if(frameCount%200 === 0){
    fire = createSprite(width,700,0,0); 
    fire.addImage(fireimg); 
    fire.velocityX = -10; 
    fire.scale = 0.3; 
    obGroup.add(fire); 
    fire.debug = false;
    fire.setCollider("circle",0,0,100); 
    fire.lifetime = 300; 
    }
}

function reset(){
  gameState = "play"; 
  gameOver.visible = false; 
  restart.visible = false; 
  tiger.changeAnimation("tigerRunning",tigerRunning); 
  obGroup.destroyEach(); 
  hunter.x = 300; 
  hunter.y = 800; 
  score = 0; 
}