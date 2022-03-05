function checkmove(x, y, move) {
  for (let wall of walls) {
    if (x === wall.x && y === wall.y && move === wall.line) {
      return false;
    }
  }
  if (move === "w" && y > 0) {
    return true;
  } else if (move === "s" && y < row - 1) {
    return true;
  } else if (move === "a" && x > 0) {
    return true;
  } else if (move === "d" && x < col - 1) {
    return true;
  } else return false;
}
function discheck(player1, player2) {
  return abs(player2.x - player1.x) + abs(player2.y - player1.y);
}
function togglefence(player, dummys) {
  let temp = Fence.on;
  if (player.x == Key.x && player.y == Key.y && player.predictdistan != 0) {
    Fence.on = !Fence.on;
  }
  for (d of dummys1) {
    if (d.x == Key.x && d.y == Key.y && d.predictdistan != 0) {
      Fence.on = !Fence.on;
    }
  }
  if (Fence.on != temp) {
    if (Fence.on == true) addwall(Fence.x, Fence.y, Fence.dir);
    if (Fence.on == false) delwall(Fence.x, Fence.y, Fence.dir);
  }
}

function addwall(x, y, move) {
  walls.push(new wall(x, y, move));
  if (move === "w") walls.push(new wall(x, y - 1, "s"));
  if (move === "s") walls.push(new wall(x, y + 1, "w"));
  if (move === "a") walls.push(new wall(x - 1, y, "d"));
  if (move === "d") walls.push(new wall(x + 1, y, "a"));
}
function findindexwall(x, y, dir) {
  let lmao = `${x}${y}${dir}`;
  let index = walls
    .map((object) => `${object.x}${object.y}${object.line}`)
    .indexOf(lmao);
  return index;
}
function delwall(x, y, move) {
  let index1 = findindexwall(x, y, move);
  if (index1 !== -1) {
    walls.splice(index1, 1);
  } else {
    return;
  }
  let index2;
  if (move === "w") index2 = findindexwall(x, y - 1, "s");
  if (move === "s") index2 = findindexwall(x, y + 1, "w");
  if (move === "a") index2 = findindexwall(x - 1, y, "d");
  if (move === "d") index2 = findindexwall(x + 1, y, "a");
  walls.splice(index2, 1);
}
function predictFence(on) {
  if (on == true && findindexwall(Fence.x, Fence.y, Fence.dir) == -1) {
    addwall(Fence.x, Fence.y, Fence.dir);
  }
  if (on == false && findindexwall(Fence.x, Fence.y, Fence.dir) != -1) {
    delwall(Fence.x, Fence.y, Fence.dir);
  }
}
function predictPMove(playerx, playery, cmd) {
  if (cmd === "w" && checkmove(playerx, playery, cmd)) {
    return { x: playerx, y: playery - 1 };
  } else if (cmd === "s" && checkmove(playerx, playery, cmd)) {
    return { x: playerx, y: playery + 1 };
  } else if (cmd === "a" && checkmove(playerx, playery, cmd)) {
    return { x: playerx - 1, y: playery };
  } else if (cmd === "d" && checkmove(playerx, playery, cmd)) {
    return { x: playerx + 1, y: playery };
  } else {
    return { x: playerx, y: playery, distan: 0 };
  }
}
function predictDumMove(dummyX, dummyY, playerx, playery, type) {
  let newdum;
  //console.log(dummyx, dummyy);
  if (type == 0) {
    newdum = new boobytrap(dummyX, dummyY);
  }
  if (type == 1) {
    newdum = new whitedummy(dummyX, dummyY);
  }
  if (type == 2) {
    newdum = new reddummy(dummyX, dummyY);
  }
  if (type == 3) {
    newdum = new whitescorpion(dummyX, dummyY);
  }
  if (type == 4) {
    newdum = new redscorpion(dummyX, dummyY);
  }
  newdum.update(playerx, playery);
  return {
    x: newdum.x,
    y: newdum.y,
    type: newdum.type,
    distan: abs(newdum.x - dummyX) + abs(newdum.y - dummyY),
  };
}
function findindexdummy2(x, y, type, dummyarr) {
  let lmao = `${x}${y}${type}`;
  let index = dummyarr
    .map((object) => `${object.x}${object.y}${object.type}`)
    .indexOf(lmao);
  return index;
}
function deldummy2(x, y, type, dummyarr) {
  let index1 = findindexdummy2(x, y, type, dummyarr);
  if (index1 !== -1) {
    dummyarr.splice(index1, 1);
  }
}
function togglefence2(player, dummys, on) {
  if (player.x == Key.x && player.y == Key.y && player.distan == undefined) {
    on = !on;
  }
  for (d of dummys) {
    if (d.x == Key.x && d.y == Key.y && d.distan != 0) {
      on = !on;
    }
  }
  return on;
}
function createVariant(variant, cmd) {
  let temp = {
    player: {},
    dummys: [],
    path: [],
    win: false,
    fenceon: undefined,
  };
  if (Key) {
    predictFence(variant.fenceon);
    // console.log(walls);
  }
  temp.player = predictPMove(variant.player.x, variant.player.y, cmd);
  //console.log(variant);
  for (let Dummy of variant.dummys) {
    temp.dummys.push(
      predictDumMove(Dummy.x, Dummy.y, temp.player.x, temp.player.y, Dummy.type)
    );
  }
  for (let Dummy of temp.dummys) {
    if (Dummy.type == 0) continue;
    for (let i of temp.dummys) {
      if (Dummy.x == i.x && Dummy.y == i.y && Dummy.type < i.type) {
        deldummy2(i.x, i.y, i.type, temp.dummys);
        // console.log(dummys1);
      }
    }
  }
  if (Key) {
    temp.fenceon = togglefence2(temp.player, temp.dummys, variant.fenceon);
  }
  temp.path = variant.path.slice();
  temp.path.push(cmd);
  if (!checkLose(temp) && checkWin(temp)) {
    temp.win = true;
    return temp;
  }
  if (!checkLose(temp) && !checkSame(temp)) {
    checkvariant.add(
      `${temp.player.x}${temp.player.y}${temp.dummys
        .map((e) => `${e.x}${e.y}`)
        .join("")}${temp.fenceon}`
    );
    return temp;
  }
}
function checkLose(variant) {
  for (Dummy of variant.dummys) {
    if (variant.player.x == Dummy.x && variant.player.y == Dummy.y) {
      return true;
    }
  }
}
let checkvariant = new Set();
function checkSame(temp) {
  return checkvariant.has(
    `${temp.player.x}${temp.player.y}${temp.dummys
      .map((e) => `${e.x}${e.y}`)
      .join("")}${temp.fenceon}`
  );
}
function checkWin(variant) {
  if (
    variant.player.x == end.x &&
    variant.player.y == end.y &&
    !checkLose(variant)
  ) {
    return true;
  }
}
function chuanhoa(ans) {
  let temp = "";
  ans.forEach((el) => {
    if (el == "w") {
      temp = temp + "Up ";
    } else if (el == "d") {
      temp = temp + "Right ";
    } else if (el == "s") {
      temp = temp + "Down ";
    } else if (el == "a") {
      temp = temp + "Left ";
    }
  });
  let htmlans = document.querySelector(".ans");
  htmlans.textContent = temp;
}

function optimize(x1, y1, x2, y2) {
  let x = x2 - x1;
  let y = y2 - y1;
  if (abs(x) >= abs(y)) {
    if (x < 0 && y < 0) {
      return ["a", "w", "s", "d"];
    }
    if (x > 0 && y < 0) {
      return ["d", "w", "s", "a"];
    }
    if (x < 0 && y > 0) {
      return ["a", "s", "w", "d"];
    }
    if (x > 0 && y > 0) {
      return ["d", "s", "w", "a"];
    }
  }
  if (abs(x) < abs(y)) {
    if (x < 0 && y < 0) {
      return ["w", "a", "d", "s"];
    }
    if (x > 0 && y < 0) {
      return ["w", "d", "s", "a"];
    }
    if (x < 0 && y > 0) {
      return ["s", "a", "d", "w"];
    }
    if (x > 0 && y > 0) {
      return ["s", "d", "a", "w"];
    }
  }
  return ["a", "w", "d", "s"];
}
function returnclass(el) {
  if (el.type == 0) {
    return new boobytrap(el.x, el.y);
  }
  if (el.type == 1) {
    return new whitedummy(el.x, el.y);
  }
  if (el.type == 2) {
    return new reddummy(el.x, el.y);
  }
  if (el.type == 3) {
    return new whitescorpion(el.x, el.y);
  }
  if (el.type == 4) {
    return new redscorpion(el.x, el.y);
  }
}
function SolveBFS() {
  // INNIT VAL
  dummys2 = [];
  checkvariant.clear();

  player2 = new player(player1.x, player1.y);
  dummys1.forEach((e) => {
    dummys2.push(returnclass(e));
  });

  console.log("calculating...");
  let begin = {
    player: {},
    dummys: [],
    path: [],
    win: false,
    fenceon: Fence ? true : false,
  };
  begin.player.x = player2.x;
  begin.player.y = player2.y;
  for (Dummy of dummys2) {
    begin.dummys.push({ x: Dummy.x, y: Dummy.y, type: Dummy.type });
  }
  let queue = [begin];
  //console.log(createVariant(begin, "w"));
  let Solved = false;
  while (queue.length) {
    // queue.forEach((e) => {
    //   console.log(e.path, e.fenceon);
    // });
    let variant = queue.shift();
    ways = optimize(variant.player.x, variant.player.y, end.x, end.y);
    for (way of ways) {
      let temp = createVariant(variant, way);
      if (temp) {
        if (temp.win == true) {
          chuanhoa(temp.path);
          if (
            Fence.on == true &&
            findindexwall(Fence.x, Fence.y, Fence.dir) == -1
          ) {
            console.log("hello");
            addwall(Fence.x, Fence.y, Fence.dir);
          }
          return;
        }
        //console.log(temp.path, temp.fenceon);
        //console.log(walls);
        queue.push(temp);
      }
    }
  }
  alert("This maze is impossible to be solved");
}
