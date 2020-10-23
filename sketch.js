var PLAY=1
var END=0

var gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var love=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,400) 
  
monkey=createSprite(100,300)
monkey.addAnimation("m",monkey_running)
  monkey.scale=0.15
  bananaGroup=new Group()
  ground=createSprite(400,370,800,50) 
 ground.shapeColor="green"
  obstacleGroup=new Group()
  monkey.setCollider("circle",0,0,300)
  monkey.debug=true
  
}


function draw() {
 background(220)
  fill("black")
  textSize(22)
    
ground.velocityX=-3
  if(ground.x<200){
    ground.x=400
  } 
  text("Survival Score:  "+ score+"   Happiness: "+ love,150,50)
  monkey.collide(ground)
  monkey.velocityY=monkey.velocityY+0.5
if(gameState===PLAY){
  score=score+((frameCount%30===0))
  
 if(touches.window||keyWentDown("space")&&monkey.y>400-1.5*monkey.width ){
    monkey.velocityY=-random(13,16)
   touches=[]
  }
   

   spawnBananas() 
  
  spawnObstacles()
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.bounceOff(monkey)
    bananaGroup.setLifetimeEach(0)
    love=love+10
    monkey.scale=monkey.scale+0.01
  }
  

  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX=0
    monkey.velocityY=0
    monkey.scale=monkey.scale-0.01
    obstacleGroup.setLifetimeEach(0)
  }
  if(monkey.scale==0.05){
    gameState=END
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
  }
  if(monkey.scale>0.5){
    text("You Won",200,200)
    gameState=END
  }
} else if(gameState===END){
  monkey.destroy()
  love=0
  obstacleGroup.setLifetimeEach(-1)
  bananaGroup.setLifetimeEach(-1)
  text("You Lose",200,200)
} 
  
  

  
  
  
  
  drawSprites()
}
function spawnBananas(){
  
if(frameCount%150===0) { 
banana=createSprite(600,random(50,200))
banana.velocityX=-3 
  banana.addImage("baba",bananaImage)
  banana.scale=0.15
  bananaGroup.add(banana)

}  
}

function spawnObstacles(){
  
if(frameCount%100===0) { 
obstacle=createSprite(600,300)
obstacle.velocityX=-(7+score/30)
  obstacle.setCollider("circle",0,0,180 )
  obstacle.debug=true
  obstacle.addImage("babu",obstacleImage)
  obstacle.scale=0.3
  obstacleGroup.add(obstacle)
 obstacle.lifetime=100
}  
}




