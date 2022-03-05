const W = 500;
const H = 500;
let row = 6;
let col = 6;
let player1;
let dummys1 = [];
let player2;
let dummys2 = [];
let walls = [];
let matrix1;
let end;
let canvas;
let Key;
let Fence;
function setup() {
  canvas = createCanvas(W, H);
  canvas.parent("Screen");
  canvas.mousePressed(config);
  matrix1 = new matrix(
    row,
    col,
    0,
    end,
    H,
    W,
    player1,
    dummys1,
    walls,
    Key,
    Fence
  );
}

function draw() {
  background(220);
  matrix1.drawMatrix();
  drawstate();
}
function keyTyped() {
  if (key == "m") {
    SolveBFS();
  }
  if (key == "a" || key == "s" || key == "w" || key == "d") {
    player1.predictdis(key);
    player1.move(key, row, col);
    for (d of dummys1) {
      d.predictdis(player1.x, player1.y);
      d.update(player1.x, player1.y);
    }
    for (d of dummys1) {
      d.attack();
    }
    if (!Key) return;
    togglefence(player1, dummys1);
    //console.log(dummys1);
  }
}
