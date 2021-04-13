var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sceship_plapayer, spaceshipdamaged;
var spaceship


var asteriodimg;

var space
var spaceimg

var gameOver, restart;
var gameoverImg, restartImg;

var score=0;
var asteriods_destroyed=0;
var lives=0;

var bullet, bulletimg;

var asteriodGroup, bulletGroup;


function preload(){
    spaceship = loadImage("spaceship2.png");
    /*spaceshipdestroyed = loadImage ("");*/

    asteriodimg = loadImage("asteriod.png");

    spaceimg = loadImage("background.jpg");

    //change animation
    gameoverImg = loadImage("gameoversample.png");

    restartImg = loadImage("restartclipart.png");
    
    bulletimg = loadImage("bu_llet.png  ")

}


function setup() {
    createCanvas(displayWidth-20, displayHeight-20);
    
    spaceship_player = createSprite(100,displayHeight/2,20,50);
    spaceship_player.addImage("spaceship", spaceship);
    spaceship_player.scale = 0.3;

    
    space = createSprite(0,0,displayWidth-20,displayHeight-20);
    space.addImage("spaceimg",spaceimg);
    space.x = space.width /2;
    space.velocityX = -(6 + 3*score/100);
    space.scale=3
    
    gameOver = createSprite(displayWidth/2,displayHeight/2-100);
    gameOver.addImage("over",gameoverImg);
    
    restart = createSprite(displayWidth/2,displayHeight/2+30);
    restart.addImage("res",restartImg);
    
    gameOver.scale = 0.4;
    restart.scale = 0.1;
  
    gameOver.visible = false;
    restart.visible = false;
    
    asteriodGroup = new Group();
    bulletGroup = new Group();
    
    score = 0;
    lives=3;
  }
  
  function draw() {
    //spaceship_player.debug = true;
    
    background(255);
    
    

   


    
  

    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      space.velocityX = -(6 + 3*score/100);
    
      if(keyDown(UP_ARROW)){
        changePosition(0,-5);
      }
      else if(keyDown(DOWN_ARROW)){
        changePosition(0,+5);
      }
  
     
   
     spaceship_player.depth= space.depth;
     spaceship_player.depth=spaceship_player.depth+1;
  
     if(keyDown("space")) {
         fire();
     }
     
    
      if (space.x < 0){
        space.x = space.width/2;
      }
    
      
      spawnasteriods();
    
     if(asteriodGroup.isTouching(spaceship_player)){
      if(lives===1){
        gameState=END;
      }
      else{
          lives=lives-1;
          asteriodGroup.destroyEach()
          bulletGroup.destroyEach()
      }} 

      if(bulletGroup.isTouching(asteriodGroup)){
        asteriodGroup.destroyEach()
        bulletGroup.destroyEach()
      }

     


    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      lives=0;
      
      //set velcity of each game object to 0
      space.velocityX = 0;
      spaceship_player.velocityY = 0;
      //spaceship_player.velocityX = 0;
      asteriodGroup.setVelocityXEach(0);
      
      
      //change the spaceship_player animation
      //spaceship_player.changeAnimation("collided",spaceship_player_collided);
      
      //set lifetime of the game objects so that they are never destroyed
     asteriodGroup.setLifetimeEach(-1);
     asteriodGroup.destroyEach();
     bulletGroup.destroyEach();

     
      
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
    
    
    drawSprites();

   
    fill("yellow");
    textFont("Verdana")
    textSize(20)
    text("Score: "+ score, 500,50);

    text("Lives: "+ lives,650,50);
    
  }
  
  function spawnasteriods() {
    if(frameCount % 60 === 0) {
      var asteriod = createSprite(600,165,10,40);
      //obstacle.debug = true;
      asteriod.velocityX = -(6 + 3*score/100);
      asteriod.x=displayWidth;
      
      //asteriod.debug = true;

      asteriod.y=Math.round(random (70,displayHeight-70));

      //generate random obstacles
      asteriod.addImage("asteriods",asteriodimg)
      
      //assign scale and lifetime to the obstacle           
      asteriod.scale = 0.2;
      asteriod.lifetime = 300;
      //add each obstacle to the group
      asteriodGroup.add(asteriod);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

  
    
    asteriodGroup.destroyEach();
    
    //spaceship_player.changeAnimation("running",spaceship_player_running);
    
   
    
    score = 0;
    lives = 3;
    
  }
  function changePosition(x,y){
    spaceship_player.x = spaceship_player.x + x;
    spaceship_player.y = spaceship_player.y + y;
}

  function fire(){
    bullet = createSprite(spaceship_player.x+100,spaceship_player.y,20,50);
    bullet.addImage("bulletfire", bulletimg);
    bullet.scale = 0.05;
    bullet.velocityX=3;
    bulletGroup.add(bullet);
    
  }
