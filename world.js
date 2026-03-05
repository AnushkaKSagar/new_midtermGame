let buildings = [
  {
    name: "Threads",
    doorX: 193,
    doorY: 148,
    starX: 170,
    starY: 21,
    levelIndex: 0,
  },
  {
    name: "Pages",
    doorX: 622,
    doorY: 171,
    starX: 565,
    starY: 24,
    levelIndex: 1,
  },
  {
    name: "Flower",
    doorX: 235,
    doorY: 508,
    starX: 170,
    starY: 360,
    levelIndex: 2,
  },
  {
    name: "Cafe",
    doorX: 628,
    doorY: 519,
    starX: 565,
    starY: 314,
    levelIndex: 3,
  },
];

// Draw the world background
function drawWorld() {
  image(worldimg, 0, 0, width, height);

  // Draw stars above each building
  for (let i = 0; i < buildings.length; i++) {
    let completed = buildingProgress[i];

    for (let j = 0; j < 3; j++) {
      let starX = buildings[i].starX + j * 35; // spacing
      let starY = buildings[i].starY;

      if (j < completed) {
        fill("#ffd700"); // gold
        stroke(0);
        strokeWeight(2);
      } else {
        fill("#cccccc"); // grey
        stroke(0);
        strokeWeight(2);
      }
      drawStar(starX, starY, 15); // size
    }
  }
}

// Check if player is at a building door
function checkBuildingEntry(player) {
  player.nearBuilding = null;
  const doorWidth = 60;
  const doorHeight = 80;

  for (let b of buildings) {
    if (
      player.x + player.size > b.doorX - 15 &&
      player.x < b.doorX - 15 + doorWidth &&
      player.y + player.size > b.doorY - 20 &&
      player.y < b.doorY - 20 + doorHeight
    ) {
      player.nearBuilding = b;
      break; // only nearest building
    }
  }
}

function drawSpeechBubble(x, y, message) {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(14);

  // Bubble shape
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(x, y - 20, textWidth(message) + 20, 40, 10);

  // Triangle pointer
  triangle(x - 10, y, x + 10, y, x, y + 10);

  // Bubble text
  noStroke();
  fill(0);
  text(message, x, y - 20);
  pop();
}

function drawStar(x, y, r) {
  push();
  translate(x, y);

  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = (TWO_PI / 5) * i - HALF_PI; //

    vertex(cos(angle) * r, sin(angle) * r);

    angle += TWO_PI / 10;
    vertex((cos(angle) * r) / 2, (sin(angle) * r) / 2);
  }
  endShape(CLOSE);

  pop();
}
