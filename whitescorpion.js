class whitescorpion extends dummy {
  constructor(x, y) {
    super(x, y);
    this.type = 3;
  }
  drawDummy(H, W, row, col) {
    fill(248, 248, 255);
    strokeWeight(5);
    rect(
      H * (this.x / col) + H / row / 4,
      W * (this.y / row) + H / col / 4,
      H / row / 2,
      W / col / 2
    );
  }
  update(playerx, playery) {
    let step = 1;
    while (step > 0 && (playerx != this.x || playery != this.y))
      if (abs(playerx - this.x) > 0) {
        let dir = (playerx - this.x) / abs(playerx - this.x);
        let temp;
        dir > 0 ? (temp = this.move("d")) : (temp = this.move("a"));
        if (temp == false) {
          if (abs(playery - this.y) > 0) {
            let dir = (playery - this.y) / abs(playery - this.y);
            dir > 0 ? this.move("s") : this.move("w");
          }
        }
        step--;
      } else {
        let dir = (playery - this.y) / abs(playery - this.y);
        dir > 0 ? this.move("s") : this.move("w");
        step--;
      }
  }
}
