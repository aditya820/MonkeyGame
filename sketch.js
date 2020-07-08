var jungle, jungleImage;
var monkey, monkeyAnimation, monkeyWon;
var banana, bananaImage
var rock, rockImage
var invisibleGround, groundImage;
var gravity = 1;
var score = 0;
var obstacleGroup, bananaGroup;
var winImage, win;


function preload(){
  jungleImage = loadImage("jungle.jpg");
  
  monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  
  rockImage = loadImage("stone.png");
  
  winImage = loadImage("YOU WIN!!!.jpg");
}


function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(150,225);
  monkey.addAnimation("monkeyRunning",monkeyAnimation);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(300,260,600,10);
  invisibleGround.visible = false;
  
  win = createSprite(300,150,10,10);
  win.addImage("youWin",winImage);
  win.visible = false;
  win.scale = 2;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}


function draw(){
 background(jungleImage);
  
 monkey.collide(invisibleGround);
  
 //Spawn obstacles
  if(frameCount % 125 === 0) {
    rock = createSprite(650,225);
    rock.velocityX = -6;
    rock.addAnimation("Stone",rockImage);
    rock.setCollider("rectangle",0,0,50,50);
    //assign scale and lifetime to the obstacle           
    rock.scale = 0.15;
    rock.lifetime = 125;
    //add each obstacle to the group
    obstacleGroup.add(rock);
    }
    
     if(frameCount % 75 === 0) {
    banana = createSprite(650,100);
    banana.velocityX = -6;
    banana.addAnimation("banana",bananaImage);
    //assign scale and lifetime to the banana          
    banana.scale = 0.05;
    banana.lifetime = 125;
    //add each banana to the group
    bananaGroup.add(banana);
  }
  
  //Make monkey jump
  if(keyDown("space") && monkey.y > 200 && score < 10){
      monkey.velocityY = -15;
    }
  
  if(keyDown("space") && monkey.y > 200 && score < 20 && score > 10 || score === 10) {
     monkey.velocityY = -20;
     gravity = 2;
     }
  
  if(keyDown("space") && monkey.y > 200 && score < 30 && score > 20 || score === 20) {
     monkey.velocityY = -25;
     gravity = 3;
     }
  
  if(keyDown("space") && monkey.y > 200 && score < 40 && score > 30 || score === 30) {
     monkey.velocityY = -30;
     gravity = 4;
     }
  
  if(keyDown("space") && monkey.y > 200 && score < 50 && score > 40 || score === 40) {
     monkey.velocityY = -35;
     gravity = 5;
     }
  
  if(score === 50) {
     win.visible = true;
    
    rock.destroy();
    banana.destroy();
     }
    
  //Add gravity to monkey
  monkey.velocityY = monkey.velocityY +  gravity;
  
  if(bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score += 2;
    }
  
  switch(score){
      case 10: monkey.scale = 0.15;
        break;
        
      case 20: monkey.scale = 0.2;
        break;
        
      case 30: monkey.scale = 0.25;
        break;
        
      case 40: monkey.scale = 0.3;
       break;
       
      case 50: monkey.scale = 0.35;
      break;
       default: break;
           }
  
  if(obstacleGroup.isTouching(monkey)) {
     score = 0;
     monkey.scale = 0.1;
     }
    
  
 drawSprites();
  
  stroke("white");
  fill("white");
  textSize(15);
  text("Score: " + score,275,20);
  text("Goal: 50",275,50);
}