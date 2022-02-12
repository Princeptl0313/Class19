var airplaneImg,airplane, airplanesGroups;
var cloudImg,cloud,cloudsGroup;
var ghostImg, ghost;
var invisibleBlockGroup,invisibleBlock;
var gameState = "play"

function preload(){
    airplaneImg = loadImage("airplane.png");
    cloudImg = loadImage("clouds.png");
    ghostImg= loadImage("ghost.png");
}

function setup() {
 createCanvas(600,600);
 cloud = createSprite(300,300);
 cloud.addImage("cloud", cloudImg);
 cloud.velocityY = 1;

 cloudsGroup = new Group();
 airplanesGroups = new Group();
 invisibleBlockGroup = new Group();

 ghost = createSprite(200,200,40,40)
 ghost.scale = 0.15;
 ghost.addImage("ghost", ghostImg)
}

function draw() {
 background(0);
 if (gameState === "play") {
     if (keyDown("left_arrow")){
         ghost.x = ghost.x - 3;
     }
     if(keyDown("right_arrow")){
         ghost.x = ghost.x + 3;
     }
     if(keyDown("space")){
         ghost.velocityY = -10;
     }

     ghost.velocityY = ghost.velocityY +0.7

     if(cloud.y > 400){
         cloud.y = 300
     }
     spawnAirplanes();

     if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
         ghost.destroy();
         gameState = "end"
     }

     drawSprites();
 }

 if (gameState === "end"){
     stroke("red");
     fill("red");
     textSize(40);
     text("Game Over", 230,250)
 }


}

function spawnAirplanes() {
    if(frameCount % 240 === 0) {
        var airplane = createSprite(200,-50);
        var invisibleBlock= createSprite(200,15);
        invisibleBlock.height = 2;

        airplane.x = Math.round(random(120,400));
        invisibleBlock.x = airplane.x;

        airplane.addImage(airplaneImg);

        airplane.velocityY = 1;
        invisibleBlock.velocityY = 1;

        ghost.depth = airplane.depth;
        ghost.depth +=1;

        airplane.lifetime = 800
        invisibleBlock. lifetime = 800;

        airplanesGroups.add(airplane);
        invisibleBlock.debug= true;
        invisibleBlockGroup.add(invisibleBlock);

    }

}