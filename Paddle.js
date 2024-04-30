const SPEED = 0.02;
export default class Paddle {
  constructor(paddle) {
    this.paddle = paddle;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddle).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.paddle.style.setProperty("--position", value);
  }
  rect() {
    return this.paddle.getBoundingClientRect();
  }
  reset() {
    this.position = 50;
  }
  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
