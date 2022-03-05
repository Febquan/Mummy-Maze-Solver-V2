class matrix {
  constructor(row, col, start, end, W, H, player, dummys, walls, Key, fence) {
    this.row = row;
    this.col = col;
    this.start = start;
    this.end = end;
    this.W = W;
    this.H = H;
    this.player = player;
    this.dummys = dummys;
    this.walls = walls;
    this.matran = [];
    this.key = Key;
    this.fence = fence;
    for (let i = 0; i < this.row; i++) {
      this.matran[i] = new Array(this.col);
    }

    //console.log(this.matran);
  }
  drawMatrix() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        strokeWeight(0.4);
        stroke(51);
        fill(255, 255, 255);
        rect(
          this.H * (j / this.col),
          this.W * (i / this.row),
          this.H / this.row,
          this.W / this.col
        );
      }
    }
    //draw player
    this.player?.drawPlayer(this.H, this.W, this.row, this.col);
    //draw mummy
    if (this.dummys) {
      for (let d of this.dummys) {
        d.drawDummy(this.H, this.W, this.row, this.col);
      }
    }

    //draw wall
    if (this.walls) {
      for (let wall of this.walls) {
        wall.drawWall();
      }
    }

    //draw end
    if (this.end) {
      fill(20, 255, 20, 70);
      noStroke();
      rect(
        this.H * (this.end.x / this.col),
        this.W * (this.end.y / this.row),
        this.H / this.row,
        this.W / this.col
      );
    }

    //console.log(this.key);
    if (this.key) {
      //console.log("hello3");
      fill(255, 234, 0);
      noStroke();
      rect(
        H * (this.key.x / col) + H / row / 4,
        W * (this.key.y / row) + H / col / 4,
        H / row / 2,
        W / col / 2
      );
    }
  }
}
