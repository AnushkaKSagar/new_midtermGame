let words = [];
let arranged = [];
let timer = 20;
let intrusiveSystem;

let sublevelRects = [
  { x1: 140, x2: 330, y1: 250, y2: 460 },
  { x1: 340, x2: 530, y1: 250, y2: 460 },
  { x1: 540, x2: 730, y1: 250, y2: 460 },
];

// ------------------
// START LEVEL
// ------------------
function startStoreLevel() {
  let levelData = levels[currentLevel].subLevels[currentSubLevel];

  let correctSentence = levelData.sentence.split(" ");

  let distractorPool = [
    "maybe",
    "oops",
    "forgot",
    "quickly",
    "sorry",
    "uh",
    "actually",
    "wait",
    "hmm",
    "like",
    "what",
    "okay",
  ];

  let distractors = shuffle(distractorPool).slice(0, levelData.distractors);

  let mixed = shuffle(correctSentence.concat(distractors));

  words = [];
  for (let w of mixed) {
    words.push({
      text: w,
      x: random(100, width - 100),
      y: random(150, height - 150),
      vx: random(-2, 2),
      vy: random(-2, 2),
    });
  }

  arranged = [];
  timer = levelData.timeLimit;

  intrusiveSystem = new IntrusiveSystem(levelData.intrusiveRate);
}

// ------------------
// DRAW STORE SCREEN
// ------------------
function drawStore() {
  if (!levels || !levels[currentLevel]) return;

  let levelData = levels[currentLevel].subLevels[currentSubLevel];

  // Background
  if (levelBackgrounds[currentLevel]) {
    image(levelBackgrounds[currentLevel], 0, 0, width, height);
  } else {
    background("#fff3e6");
  }
  if (arranged.length === levelData.sentence.split(" ").length) {
    if (arranged.join(" ") === levelData.sentence) {
      if (buildingProgress[currentLevel] < 3) {
        buildingProgress[currentLevel]++;
      }
      arranged = [];
      gameState = "world";
    }
  }

  // Speech bubble
  drawSpeechBubble(width / 2, 50, levelData.question);

  // -------------------
  // TIMER LOGIC
  // -------------------
  if (frameCount % 60 === 0 && timer > 0) timer--;

  if (timer <= 0) gameState = "fail";

  // -------------------
  // TIMER CIRCLE
  // -------------------
  let maxTime = levelData.timeLimit;
  let timeRatio = timer / maxTime;

  let centerX = 75;
  let centerY = 60;
  let size = 70;

  noStroke();
  fill("#ff4d4d");
  ellipse(centerX, centerY, size);

  fill(255);
  arc(
    centerX,
    centerY,
    size,
    size,
    -HALF_PI + TWO_PI * timeRatio,
    -HALF_PI + TWO_PI,
    PIE,
  );

  fill(255);
  ellipse(centerX, centerY, size * 0.65);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(timer, centerX, centerY);

  // -------------------
  // WORDS
  // -------------------
  for (let w of words) {
    w.x += w.vx;
    w.y += w.vy;

    if (w.x < 50 || w.x > width - 50) w.vx *= -1;
    if (w.y < 150 || w.y > height - 120) w.vy *= -1;

    // Bubble
    fill("#d0f4ff");
    stroke(0);
    rectMode(CENTER);
    rect(w.x, w.y, 80, 40, 8);

    // Text
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(w.text, w.x, w.y);
  }

  // -------------------
  // ARRANGED SENTENCE
  // -------------------
  fill("#ffffff");
  rect(width / 2, height - 100, width - 40, 60, 10);

  fill(0);
  textAlign(LEFT, CENTER);
  textSize(16);
  text(arranged.join(" "), 60, height - 100);

  // -------------------
  // WIN CONDITION
  // -------------------
  if (arranged.length === levelData.sentence.split(" ").length) {
    if (arranged.join(" ") === levelData.sentence) {
      gameState = "world";
    }
  }

  // -------------------
  // INTRUSIVE SYSTEM
  // -------------------
  if (intrusiveSystem) {
    intrusiveSystem.update();
    intrusiveSystem.display();
  }
}

// ------------------
// MOUSE PRESS
// ------------------
function mousePressed() {
  // Close instructions first
  if (gameState === "world" && showInstructions) {
    let xLeft = width / 2 + 210;
    let xRight = xLeft + 30;
    let yTop = height / 2 - 140;
    let yBottom = yTop + 30;

    if (
      mouseX > xLeft &&
      mouseX < xRight &&
      mouseY > yTop &&
      mouseY < yBottom
    ) {
      showInstructions = false;
      return;
    }
  }

  if (gameState === "store") {
    let clickedWord = null;

    for (let i = words.length - 1; i >= 0; i--) {
      let w = words[i];
      if (
        mouseX > w.x - 45 &&
        mouseX < w.x + 45 &&
        mouseY > w.y - 20 &&
        mouseY < w.y + 20
      ) {
        clickedWord = w.text;
        break;
      }
    }

    if (clickedWord !== null) {
      let levelData = levels[currentLevel].subLevels[currentSubLevel];
      let expectedWord = levelData.sentence.split(" ")[arranged.length];

      if (clickedWord === expectedWord) {
        arranged.push(clickedWord);
        words = words.filter((w) => w.text !== clickedWord);
      } else {
        gameState = "fail";
      }
    }

    if (intrusiveSystem) intrusiveSystem.handleClick(mouseX, mouseY);
  }

  if (gameState === "levelSelect") {
    // Sublevel clicks (example, adjust per sublevel)
    for (let i = 0; i < sublevelRects.length; i++) {
      let rect = sublevelRects[i];
      if (
        mouseX > rect.x1 &&
        mouseX < rect.x2 &&
        mouseY > rect.y1 &&
        mouseY < rect.y2
      ) {
        currentSubLevel = i;
        startStoreLevel();
        gameState = "store";
        return;
      }
    }

    // Back button click
    if (mouseX > 66 && mouseX < 210 && mouseY > 608 && mouseY < 660) {
      gameState = "world";
      return;
    }
  }
}

// ------------------
// SPEECH BUBBLE
// ------------------
function drawSpeechBubble(x, y, message) {
  push();

  textAlign(CENTER, CENTER);
  textSize(16);

  let bubbleWidth = textWidth(message) + 40;
  let bubbleHeight = 60;
  let bubbleY = y + 80;

  // Bubble
  fill(255);
  stroke(0);
  rectMode(CENTER);
  rect(x, bubbleY, bubbleWidth, bubbleHeight, 15);

  // Pointer
  noStroke();
  triangle(
    x - 15,
    bubbleY + bubbleHeight / 2,
    x + 15,
    bubbleY + bubbleHeight / 2,
    x,
    bubbleY + bubbleHeight / 2 + 15,
  );

  // Text
  fill(0);
  text(message, x, bubbleY);

  pop();
}
