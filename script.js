// Add all built-in functions and variables used from p5 libraries
// to the global comment for glitch to recognize the code:
/* global
 * loadImage
 * createCanvas, background, colorMode, HSB, random, width, height,
 * windowWidth, windowHeight, noStroke, fill, ellipse, image, text, frameCount
 * keyIsDown, keyPressed, keyCode, LEFT_ARROW, RIGHT_ARROW, collideRectRect, textFont, textSize
 * textAlign, CENTER, LEFT
 */

let catImage, cushionImage, cushionImage2, cloudImage, walkingCatImage, catImage2;
function preload() {
  catImage = loadImage(
    "https://cdn.glitch.com/2ce08a5a-5720-473d-b331-a11380828bdc%2Fpeaches_cat.png?v=1627061338247"
  );
  cushionImage = loadImage(
    "https://cdn.glitch.com/2ce08a5a-5720-473d-b331-a11380828bdc%2Fcushion.png?v=1627061340849"
  );
  cushionImage2 = loadImage(
    "https://cdn.glitch.com/2ce08a5a-5720-473d-b331-a11380828bdc%2Fcushion2.png?v=1627063275030"
  );
  cloudImage = loadImage(
    "https://cdn.glitch.com/2ce08a5a-5720-473d-b331-a11380828bdc%2Fthumbnails%2Fa287c724-2eb1-401c-9cc2-86dab4e29ffa.image.png?1627064932679"
  );
  walkingCatImage = loadImage(
    "https://cdn.glitch.com/2ce08a5a-5720-473d-b331-a11380828bdc%2Fwalking_peaches.png?v=1627068309828"
  );
  catImage2 = loadImage(
    "https://cdn.glitch.com/2ce08a5a-5720-473d-b331-a11380828bdc%2Fthumbnails%2Femojipng.com-3444704.png?1627068091131"
  );
}
// Add all custom variables you create to a 'let' call:
let cats;
let playerOne, playerTwo;
let playerOneStack, playerTwoStack;
let playerOneStackHeight, playerTwoStackHeight;
let playerOneScore, playerTwoScore;

let catWidth = 75;
let catHeight = 50;
let cushionWidth = 100;
let cushionHeight = 50;

let timeLimit = 3000;

let startOfGame, gameOver;

function setup() {
  startOfGame = true;
  gameOver = false;

  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);

  cats = [];
  playerOneScore = 0;
  playerTwoScore = 0;

  for (let i = 0; i < 10; i++) {
    cats.push(new fallingCat());
  }
  playerOne = new catCushion(1);
  playerTwo = new catCushion(2);
  playerOneStackHeight = cushionHeight;
  playerTwoStackHeight = cushionHeight;
}

//helena, emily
function draw() {
  if (startOfGame) {
    introScreen();
  } else if (gameOver) {
    gameOverScreen();
  } else {
    background(190, 28, 100);
    drawBackground();
    playerOne.display();
    playerTwo.display();
    moveCushions();

    for (let cat of cats) {
      cat.move();
      cat.display();
    }
    /*
    if(round(millis()%10000==1)){
      for(let i = 0; i < 10; i++) {
        cats.push(new fallingCat());
      }
    }
    */
    if (frameCount % 20 == 1) {
      for (let i = 0; i < 1; i++) {
        cats.push(new fallingCat());
      }
    }
    checkCollisions();
    drawScores();
    drawTime();

    if (frameCount == timeLimit) {
      gameOver = true;
    }
  }
}

function mousePressed() {
  // We'll use this for console log statements only.
  const cat = cats[0];
  console.log(cat.x);
}

//helena
function drawScores() {
  fill(0);
  textFont("Helvetica");
  textSize(20);
  text(`Player 1 Score: ${playerOneScore}`, 20, 30);
  text(`Player 2 Score: ${playerTwoScore}`, width - 180, 30);
}

//emily
function drawTime() {
  fill(0);
  textFont("Helvetica");
  textSize(20);
  textAlign(CENTER);
  text(`Time elapsed: ${frameCount} / ${timeLimit}`, width / 2, 30);
  textAlign(LEFT);
}

//helena
function drawBackground() {
  //clouds
  image(cloudImage, width / 5, height / 6);
  image(cloudImage, width / 2, height / 2, 40, 25);
  image(cloudImage, width / 1.5, height / 2.8, 200, 125);
}

//emily
function introScreen() {
  //press s to start
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(100);
  text("KITTY CATCH", width / 2, height / 3);
  textSize(30);
  text("Instructions", width / 2, height / 2 - 50);
  textSize(15);
  text("Try to catch as many cats as possible", width / 2, height / 2 - 20);
  text("Use A and D keys to move Player 1", width / 2, height / 2);
  text(
    "Use left and right arrows to move Player 2",
    width / 2,
    height / 2 + 20
  );
  textSize(20);
  text('Press "s" to start', width / 2, height / 2 + 60);
  textSize(12);
  textAlign(LEFT);
  
  //image(catImage2, 0, height - 200, 255, 192);
  
  for(let xCoord = 0; xCoord < width; xCoord += 255)
    {
      image(walkingCatImage, xCoord, 100, 260, 102);
    }
  image(catImage2, width/1.8, height/1.5);
  
}

//helena
function gameOverScreen() {
  //display scores in middle
  background(0);
  image(catImage, width / 2 - 100, height / 5);
  textFont("Helvetica");
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text(`GAME OVER!!`, width / 2, height / 2 - 30);
  textSize(15);
  text(`Player 1 Score: ${playerOneScore}`, width / 2, height / 2 + 10);
  text(`Player 2 Score: ${playerTwoScore}`, width / 2, height / 2 + 30);
  textSize(20);
  text('Press "r" to restart', width / 2, height / 2 + 65);
  textAlign(LEFT);
}

//emily & helena
function keyPressed() {
  if (keyCode == 83 && startOfGame) {
    startOfGame = false;
    frameCount = 0;
  }

  if (keyCode == 82 && gameOver) {
    setup();
  }
}

//emily
function moveCushions() {
  if (keyIsDown(65)) {
    // if a key is down
    playerOne.x -= 5;
  }

  if (keyIsDown(68)) {
    // if d key is down
    playerOne.x += 5;
  }

  if (keyIsDown(LEFT_ARROW)) {
    playerTwo.x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    playerTwo.x += 5;
  }
}

//emily
function checkCollisions() {
  //if falling cat collides with cushion or cat at top

  //if y's are at the same level -- from middle to top
  //and x's are close enough --

  //   for(let cat of cats)
  //     {
  //       let catYHitbox = cat.y + catHeight;
  //       let catXHitboxLeft = cat.x;
  //       let catXHitboxRight = cat.x + catWidth;
  //       let playerOneXCenter = playerOne.x + cushionWidth/2;
  //       let playerTwoXCenter = playerTwo.x + cushionWidth/2;

  //       if(catYHitbox > playerOne.y && catYHitbox < (playerOne.y + cushionHeight/2) && catXHitboxLeft < playerOneXCenter && playerOneXCenter < catXHitboxRight)
  //         {
  //           playerOneScore++;
  //         }

  //       if(catYHitbox > playerTwo.y && catYHitbox < (playerTwo.y + cushionHeight/2) && catXHitboxLeft < playerTwoXCenter && playerTwoXCenter < catXHitboxRight)
  //         {
  //           playerTwoScore++;
  //         }
  //     }
  for (let cat of cats) {
    let hitPlayerOne = collideRectRect(
      cat.x,
      cat.y,
      catWidth,
      catHeight,
      playerOne.x,
      playerOne.y,
      cushionWidth,
      cushionHeight
    );
    let hitPlayerTwo = collideRectRect(
      cat.x,
      cat.y,
      catWidth,
      catHeight,
      playerTwo.x,
      playerTwo.y,
      cushionWidth,
      cushionHeight
    );

    if (hitPlayerOne && hitPlayerTwo) {
      let rngValue = random(0, 1);
      if (rngValue < 0.5) {
        hitPlayerTwo = false;
      } else {
        hitPlayerOne = false;
      }
    }

    if (hitPlayerOne) {
      let index = cats.indexOf(cat);
      if (index > -1) {
        cats.splice(index, 1);
      }
      playerOneScore++;
    }
    if (hitPlayerTwo) {
      let index = cats.indexOf(cat);
      if (index > -1) {
        cats.splice(index, 1);
      }
      playerTwoScore++;
    }
  }
}

//helena
class fallingCat {
  constructor() {
    this.x = random(width);
    this.y = random(0, 10);
    this.radius = random(20, 35);
    //this.color = random(360);
    this.baseYVelocity = random(1.5, 3);
    this.yVelocity = this.baseYVelocity;
  }

  move() {
    // move the cat
    this.y += this.yVelocity;
    this.yVelocity = this.baseYVelocity;
  }

  display() {
    // draw the cat
    image(catImage, this.x, this.y, catWidth, catHeight);
  }
}

//emily
class catCushion {
  constructor(playerNumber) {
    if (playerNumber == 1) {
      this.x = width / 4;
      this.y = height - cushionHeight - 15;
      this.id = playerNumber;
      this.image = cushionImage;
    } else {
      this.x = (width * 3) / 4;
      this.y = height - cushionHeight - 15;
      this.id = playerNumber;
      this.image = cushionImage2;
    }
  }
  display() {
    image(this.image, this.x, this.y, cushionWidth, cushionHeight);
  }
}
