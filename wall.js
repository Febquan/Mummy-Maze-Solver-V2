class wall {
  constructor(x, y, temp, type = 0) {
    this.x = x;
    this.y = y;
    this.posx = W * (this.x / col);
    this.posy = H * (this.y / row);
    this.line = temp;
  }

  drawWall() {
    strokeWeight(10);
    stroke(0, 0, 0);

    if (this.line === "w") {
      line(this.posx, this.posy, this.posx + W / col, this.posy);
    }
    if (this.line === "s") {
      line(
        this.posx,
        this.posy + H / row,
        this.posx + W / col,
        this.posy + H / row
      );
    }
    if (this.line === "a") {
      line(this.posx, this.posy, this.posx, this.posy + H / row);
    }
    if (this.line === "d") {
      line(
        this.posx + W / col,
        this.posy,
        this.posx + W / col,
        this.posy + H / row
      );
    }
  }
}
