const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000001;
export default class Ball {
  constructor(ball) {
    this.ball = ball;
    this.reset();
  }
  get x() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"));
  }
  set x(value) {
    this.ball.style.setProperty("--x", value);
  }
  get y() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--y"));
  }
  set y(value) {
    this.ball.style.setProperty("--y", value);
  }

  rect() {
    return this.ball.getBoundingClientRect();
  }
  reset() {
    this.x = 50;
    this.y = 50;
    this.directions = { x: 0 };
    while (
      Math.abs(this.directions.x) <= 0.2 ||
      Math.abs(this.directions.x) >= 0.9
    ) {
      const heading = randomNumBetween(0, 2 * Math.PI);
      this.directions = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY;
  }
  update(delta, paddleRects) {
    this.x += this.directions.x * this.velocity * delta;
    this.y += this.directions.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.directions.y *= -1;
    }
    if (paddleRects.some((r) => isCollison(r, rect))) {
      this.directions.x *= -1;
    }
  }
}

function randomNumBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollison(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
