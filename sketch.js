let player;
let levelBackgrounds = [];
let worldimg;
let startimg;
let characterimg;
let tryagainimg;
let playerImages = [];
let showInstructions = true;
let levelSelectBackgrounds = [];

function setup() {
  noStroke();
  let cnv = createCanvas(800, 600);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

player = new Player();
textFont("Patrick Hand");

function preload() {
  // Load level-specific backgrounds
  for (let lvl of levels) {
    levelBackgrounds.push(loadImage(lvl.bgImg));
  }
  worldimg = loadImage("assets/worldBackground.png");
  startimg = loadImage("assets/introImage.png");
  characterimg = loadImage("assets/characterBackground.png");
  tryagainimg = loadImage("assets/tryagainScreen.png");

  playerImages[0] = loadImage("assets/player1.png");
  playerImages[1] = loadImage("assets/player2.png");
  playerImages[2] = loadImage("assets/player3.png");

  levelSelectBackgrounds.push(loadImage("assets/clothinglevels.png"));
  levelSelectBackgrounds.push(loadImage("assets/booklevels.png"));
  levelSelectBackgrounds.push(loadImage("assets/flowerlevels.png"));
  levelSelectBackgrounds.push(loadImage("assets/coffeelevels.png"));
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "characterSelect") {
    drawCharacterSelect();
  } else if (gameState === "world") {
    drawWorld();
    player.move();
    player.display();
    checkBuildingEntry(player);
    fill(0);
    textSize(16);
    textAlign(LEFT, TOP);
    noStroke();
    text(`X: ${Math.floor(player.x)}  Y: ${Math.floor(player.y)}`, 10, 10);
    checkBuildingEntry(player);

    // Show Press ENTER if near building
    if (player.nearBuilding) {
      textAlign(CENTER, CENTER);
      textSize(18);

      let message = "Press ENTER";
      let paddingX = 20; // horizontal padding
      let paddingY = 10; // vertical padding

      // Get text width and height
      let boxWidth = textWidth(message) + paddingX * 2;
      let boxHeight = 18 + paddingY * 2; // 18 is textSize

      // Draw white rectangle behind the text
      fill(255); // white
      rectMode(CENTER);
      rect(width / 2, height - 40, boxWidth, boxHeight, 5); // last parameter is corner rounding

      // Draw the text on top
      fill(0); // black text
      text(message, width / 2, height - 40);
    }

    if (showInstructions) {
      drawInstructionsPopup();
    }
  } else if (gameState === "store") {
    drawStore();
  } else if (gameState === "fail") {
    drawFailScreen();
  } else if (gameState === "levelSelect") {
    drawLevelSelect();
    text(`X: ${Math.floor(mouseX)}  Y: ${Math.floor(mouseY)}`, 55, 15);
  }
}

function keyPressed() {
  // Start game
  if (gameState === "start" && key === " ") {
    gameState = "characterSelect";
  }

  // Character selection
  else if (gameState === "characterSelect") {
    if (key === "1") {
      selectedCharacter = "boy";
      player.setCharacter("boy");
      gameState = "world";
    }
    if (key === "2") {
      selectedCharacter = "girl";
      player.setCharacter("girl");
      gameState = "world";
    }
    if (key === "3") {
      selectedCharacter = "unisex";
      player.setCharacter("unisex");
      gameState = "world";
    }
  } else if (gameState === "world") {
    if (keyCode === ENTER && player.nearBuilding) {
      currentLevel = player.nearBuilding.levelIndex;
      gameState = "levelSelect";
    }
  }

  // Fail screen retry
  else if (gameState === "fail") {
    if (key === " ") {
      startStoreLevel();
      gameState = "store";
    } else if (keyCode === ENTER) {
      gameState = "world";
    }
  } else if (gameState === "success") {
    if (key === " " || keyCode === ENTER) {
      gameState = "world";
    }
  }
}
