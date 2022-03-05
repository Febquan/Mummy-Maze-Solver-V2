class boobytrap extends dummy {
  constructor(x, y) {
    super(x, y);
    this.type = 0;
  }
  drawDummy(H, W, row, col) {
    fill(105, 105, 105);
    strokeWeight(5);
    circle(
      H * (this.x / col) + H / col / 2,
      W * (this.y / row) + H / row / 2,
      H / row / 2
    );
  }
  update(playerx, playery) {
    return;
  }
}
