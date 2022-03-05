class player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move(cmd) {
    if (cmd === "w" && checkmove(this.x, this.y, cmd)) {
      this.y = this.y - 1;
    } else if (cmd === "s" && checkmove(this.x, this.y, cmd)) {
      this.y = this.y + 1;
    } else if (cmd === "a" && checkmove(this.x, this.y, cmd)) {
      this.x = this.x - 1;
    } else if (cmd === "d" && checkmove(this.x, this.y, cmd)) {
      this.x = this.x + 1;
    } else return false;
  }
  drawPlayer(H, W, row, col) {
    fill(255, 255, 51);
    strokeWeight(5);
    rect(H * (this.x / col), W * (this.y / row), H / row, W / col);
  }
  predictdis(cmd) {
    let predict = predictPMove(this.x, this.y, cmd);
    this.predictdistan = abs(this.x - predict.x) + abs(this.y - predict.y);
  }
}
