class redscorpion extends dummy {
  constructor(x, y) {
    super(x, y);
    this.type = 4;
  }
  drawDummy(H, W, row, col) {
    fill(240, 128, 128);
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
      if (abs(playery - this.y) > 0) {
        let dir = (playery - this.y) / abs(playery - this.y);
        let temp;
        dir > 0 ? (temp = this.move("s")) : (temp = this.move("w"));
        if (temp == false) {
          if (abs(playerx - this.x) > 0) {
            let dir = (playerx - this.x) / abs(playerx - this.x);
            dir > 0 ? this.move("d") : this.move("a");
          }
        }
        step--;
      } else {
        let dir = (playerx - this.x) / abs(playerx - this.x);
        dir > 0 ? this.move("d") : this.move("a");
        step--;
      }
  }
}
