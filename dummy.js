class dummy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.predictdistan;
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
  attack() {
    for (let Dummy of dummys1) {
      if (this.type == 0) return;
      if (Dummy.x == this.x && Dummy.y == this.y && this.type < Dummy.type) {
        deldummy2(Dummy.x, Dummy.y, Dummy.type, dummys1);
        // console.log(dummys1);
      }
    }
  }
  predictdis(playerx, playery) {
    let predict = predictDumMove(this.x, this.y, playerx, playery, this.type);
    this.predictdistan = abs(this.x - predict.x) + abs(this.y - predict.y);
  }
}
