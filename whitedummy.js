class whitedummy extends dummy {
  constructor(x, y) {
    super(x, y);
    this.type = 1;
    console.log(this.predictdis);
  }
  drawDummy(H, W, row, col) {
    fill(248, 248, 255);
    strokeWeight(5);
    rect(H * (this.x / col), W * (this.y / row), H / row, W / col);
  }
  update(playerx, playery) {
    let step = 2;
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
