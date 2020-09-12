var monkey, monkey_running;
var bananas, bananaImage;
var jungle, jungleImage;
var stones, stoneImage;
var invisibleGround, count, score;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");

  jungleImage = loadImage("jungle.jpg");

  stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);

  jungle = createSprite(100, 200);
  jungle.addImage("jungle", jungleImage);
  jungle.x = jungle.width / 2;
  jungle.velocityX = -5;
  jungle.scale = 0.9;

  monkey = createSprite(100, 350);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  monkey.debug = false;
  monkey.setCollider("circle",0,0,150);

  invisibleGround = createSprite(200, 390, 400, 10);
  invisibleGround.visible = false;

  stones = createGroup();
  bananas = createGroup();

  count = 0;
  score = 10;
  fill("black");
}

function draw() {
  background(220);

  if (jungle.x < 100) {
    jungle.x = jungle.width / 3;
  }

  monkey.collide(invisibleGround);
  monkey.velocityY = monkey.velocityY + 0.1;
  count = count + Math.round(World.frameCount / 50);

  obstacles();
  fruit();

  if (keyDown("space") && monkey.y >= 350) {
    monkey.velocityY = -4;
  }

  if (monkey.isTouching(stones)) {
    score = score - 1;
  }

  if (monkey.isTouching(bananas)) {
    score = score + 3;
    bananas.destroyEach();
  }

  drawSprites();
  text("SURVIVAL TIME : " + count, 200, 75);
  text("ENERGY LEVEL : " + score, 200, 50);
}

function obstacles() {
  if (frameCount % 100 === 0) {
    var stone = createSprite(500, 380);
    stone.addImage("stone", stoneImage);
    stone.velocityX = jungle.velocityX;
    stone.scale = 0.2;
    stone.lifetime = 105;
    stone.debug = false;
    stone.setCollider("circle",0,0,150);
    stones.add(stone);
  }
}

function fruit() {
  if (frameCount % 129 === 0) {
    var banana = createSprite(500, 270);
    banana.velocityX = jungle.velocityX;
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.lifetime = 105;
    bananas.add(banana);
  }
}