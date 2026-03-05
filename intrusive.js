class IntrusiveSystem {
  constructor(rate) {
    this.rate = rate;
    this.thoughts = [];
  }

  update() {
    if (frameCount % this.rate === 0) {
      this.thoughts.push({
        text: random([
          "You're too slow.",
          "They think you're awkward.",
          "Why did you say that?",
          "Did you forget something?",
          "You're messing up.",
        ]),
        x: random(width),
        y: random(height),
      });
    }
  }

  display() {
    for (let t of this.thoughts) {
      // Draw the rectangle
      fill(255, 200);
      rectMode(CENTER);
      rect(t.x, t.y, 250, 40, 5);

      // Draw the text centered
      fill(0);
      textAlign(CENTER, CENTER); // Center horizontally and vertically
      textSize(16); // adjust size as needed
      text(t.text, t.x, t.y);
    }
  }

  handleClick(mx, my) {
    this.thoughts = this.thoughts.filter(
      (t) => !(mx > t.x && mx < t.x + 200 && my > t.y && my < t.y + 40),
    );
  }
}
