let Stateofinput = 0;
let Canvas = document.querySelector(".p5Canvas");
let Matrixinput = document.querySelector(".matrix-input-box");
let Setup = document.querySelector(".Setup");
let clearmummy = document.querySelector(".clearD");
Matrixinput.addEventListener("change", (e) => {
  let temp = parseInt(Matrixinput.value);
  row = temp;
  col = temp;
  walls = [];
  dummys1 = [];
  dummys2 = [];
  Key = undefined;
  if (Fence) delwall(Fence.x, Fence.y, Fence.dir);
  Fence = undefined;
  matrix1 = new matrix(temp, temp, 0, end, H, W, player1, dummys1, walls);
});
clearmummy.addEventListener("click", () => {
  dummys1 = [];
  dummys2 = [];
  Key = undefined;
  if (Fence) delwall(Fence.x, Fence.y, Fence.dir);
  Fence = undefined;
  matrix1 = new matrix(row, col, 0, end, H, W, player1, dummys1, walls);
});
Setup.addEventListener("click", (e) => {
  let pointer = e.target;
  if (pointer.className == "Setup") return;
  Stateofinput = parseInt(pointer.dataset.state);
  document
    .querySelectorAll(".Place")
    .forEach((el) => el.classList.remove("state-on"));
  pointer.classList.toggle("state-on");
});

let temp1 = true;
let X1;
let Y1;
let temp2 = false;
let X2;
let Y2;
let dir;
function direction(x1, y1, x2, y2) {
  if (x2 - x1 && y2 - y1) return;
  if (x2 - x1 >= 1 && y2 - y1 == 0) return "d";
  if (x2 - x1 <= -1 && y2 - y1 == 0) return "a";
  if (x2 - x1 == 0 && y2 - y1 >= 1) return "s";
  if (x2 - x1 == 0 && y2 - y1 <= -1) return "w";
}
function drawstate() {
  stroke(1);
  strokeWeight(5);
  let x = Math.floor((mouseX / W) * col);
  let y = Math.floor((mouseY / H) * row);
  if (Stateofinput == 0 || Stateofinput == 10) {
    return;
  }
  if (Stateofinput == 3 || Stateofinput == 3.5) {
    fill(0, 0, 0, 100);

    if (mouseIsPressed == true && Stateofinput == 3) {
      temp2 = true;
      if (temp1) {
        X1 = x;
        Y1 = y;
        temp1 = false;
      }
      rect(H * (X1 / col), W * (Y1 / row), H / row, W / col);
      line((X1 + 1 / 2) * (W / col), (Y1 + 1 / 2) * (H / row), mouseX, mouseY);
    }
    if (mouseIsPressed == false && Stateofinput == 3) {
      rect(H * (x / col), W * (y / row), H / row, W / col);
      temp1 = true;
      if (temp2) {
        X2 = x;
        Y2 = y;
        temp2 = false;
        dir = direction(X1, Y1, X2, Y2);
        //console.log(findindexwall(X1, Y1, dir));
        if (findindexwall(X1, Y1, dir) == -1) {
          addwall(X1, Y1, dir);
          if (Key && Fence && Fence.dir) return;
          if (Key) {
            Fence = { x: X1, y: Y1, dir: dir, on: true };
            if (Fence.dir) Stateofinput = 0;
            console.log(Key, Fence);
          }

          //console.log("sup");
        } else {
          delwall(X1, Y1, dir);
          //console.log("hello");
        }
      }
    }
    if (mouseIsPressed == false && Stateofinput == 3.5) {
      X1 = x;
      Y1 = y;
      Stateofinput = 3;
    }
    return;
  }

  if (Stateofinput == 1) {
    fill(255, 255, 51, 70);
  }
  if (Stateofinput == 2) {
    fill(20, 255, 20, 70);
  }
  if (Stateofinput == 4) {
    fill(248, 248, 255, 70);
  }
  if (Stateofinput == 5) {
    fill(240, 128, 128);
  }
  if (Stateofinput == 6) {
    fill(248, 248, 255, 70);
    rect(
      H * (x / col) + H / row / 4,
      W * (y / row) + H / col / 4,
      H / row / 2,
      W / col / 2
    );
    return;
  }
  if (Stateofinput == 7) {
    fill(240, 128, 128);
    rect(
      H * (x / col) + H / row / 4,
      W * (y / row) + H / col / 4,
      H / row / 2,
      W / col / 2
    );
    return;
  }
  if (Stateofinput == 8) {
    fill(105, 105, 105);
    circle(
      H * (x / col) + H / col / 2,
      W * (y / row) + H / row / 2,
      H / row / 2
    );
    return;
  }
  if (Stateofinput == 9) {
    fill(255, 234, 0, 70);
    rect(
      H * (x / col) + H / row / 4,
      W * (y / row) + H / col / 4,
      H / row / 2,
      W / col / 2
    );
    return;
  }
  rect(H * (x / col), W * (y / row), H / row, W / col);
}

function config() {
  let x = Math.floor((mouseX / W) * col);
  let y = Math.floor((mouseY / H) * row);
  //console.log(a + "sds");

  if (Stateofinput == 1) {
    player1 = new player(x, y);
  }
  if (Stateofinput == 2) {
    end = { x: x, y: y };
  }
  if (Stateofinput == 4) {
    dummys1.push(new whitedummy(x, y));
  }
  if (Stateofinput == 5) {
    dummys1.push(new reddummy(x, y));
  }
  if (Stateofinput == 6) {
    dummys1.push(new whitescorpion(x, y));
  }
  if (Stateofinput == 7) {
    dummys1.push(new redscorpion(x, y));
  }
  if (Stateofinput == 8) {
    dummys1.push(new boobytrap(x, y));
  }
  if (Stateofinput == 9) {
    Key = undefined;
    if (Fence) delwall(Fence.x, Fence.y, Fence.dir);
    Fence = undefined;
    Key = { x: x, y: y };
    Stateofinput = 3.5;
  }

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
