let playerTurn = 1;
let turnsPlayed = 0;
let p1Color = "red";
let p2Color = "blue";
let player1Score = 0;
let player2Score = 0;
let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
let musicPlaying = false;
/*P1=1  P2=10*/
function readGrid(gridBox, y, x) {
  console.log(grid);
  playSound();
  readColors();
if (musicPlaying==false) { 
    musicPlaying = true;
    startMusic();
}
  if (grid[y][x] == 10 || grid[y][x] == 1) {
    console.log("cannot use this grid");
  } else {
    writeGrid(y, x);
    switch (playerTurn) {
      case 1:
        gridBox.style = "background-color:" + p1Color;
        playerTurn = 2;
        break;
      case 2:
        gridBox.style = "background-color:" + p2Color;
        playerTurn = 1;
        break;
    }
  }
  check();
}
function writeGrid(y, x) {
  if (playerTurn == 1) {
    grid[y][x] = 1;
  } else if (playerTurn == 2) {
    grid[y][x] = 10;
  } else {
    console.log("Invalid playerTurn");
  }
}
function check() {
  if (
    grid[0][0] + grid[0][1] + grid[0][2] == 3 ||
    grid[1][0] + grid[1][1] + grid[1][2] == 3 ||
    grid[2][0] + grid[2][1] + grid[2][2] == 3 ||
    grid[0][0] + grid[1][0] + grid[2][0] == 3 ||
    grid[0][1] + grid[1][1] + grid[2][1] == 3 ||
    grid[0][2] + grid[1][2] + grid[1][2] == 3 ||
    grid[0][0] + grid[1][1] + grid[2][2] == 3 ||
    grid[2][0] + grid[1][1] + grid[0][2] == 3
  ) {
    console.log("p1Winner");
    endgame(1);
  }
  if (
    grid[0][0] + grid[0][1] + grid[0][2] == 30 ||
    grid[1][0] + grid[1][1] + grid[1][2] == 30 ||
    grid[2][0] + grid[2][1] + grid[2][2] == 30 ||
    grid[0][0] + grid[1][0] + grid[2][0] == 30 ||
    grid[0][1] + grid[1][1] + grid[2][1] == 30 ||
    grid[0][2] + grid[1][2] + grid[1][2] == 30 ||
    grid[0][0] + grid[1][1] + grid[2][2] == 30 ||
    grid[2][0] + grid[1][1] + grid[0][2] == 30
  ) {
    console.log("p2Winner");
    endgame(2);
  }
  console.log(turnsPlayed);
  if (turnsPlayed >= 8) {
    endgame(3);
  }
  turnsPlayed++;
}
function endgame(win) {
  document.getElementById('footer').style = `
      display: flex;
  `;
  document.getElementById("main").style.display = "none";
  switch (win) {
    case 1:
      document.getElementById("endScreen").innerHTML = `
            <h2>Player1</h2>
            <h3>Wins</h3>
            <div id="win">
            <button onclick="reset()">Reset</button>
            </div>
            `;
      player1Score++;
      console.log(player1Score);
      updateScore();
      playSoundWin(); 
      break;
    case 2:
      document.getElementById("endScreen").innerHTML = `
            <h2>Player2</h2>
            <h3>Wins</h3>
            <div id="win">
            <button onclick="reset()">Reset</button>
            </div>
            `;
      player2Score++;
      console.log(player2Score);
      updateScore();
      playSoundWin(); 
      break;
    case 3:
      document.getElementById("endScreen").innerHTML = `
            <h2 style="color:blue">Nobody</h2>
            <h3>Wins</h3>
            <div id="win">
            <button onclick="reset()">Reset</button>
            </div>
            `;
      break;
  }
}
function reset() {
  grid = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  console.log("Reset");
  document.getElementById("endScreen").innerHTML = "";
  document.getElementById("main").style.display = "grid";
  console.log(document.getElementById("main").style.display);
  

  document.getElementById("main").innerHTML = `
   
      <div class="blocks" onclick="readGrid(this, 0, 0)"></div>
      <div class="blocks" onclick="readGrid(this, 0, 1)"></div>
      <div class="blocks" onclick="readGrid(this, 0, 2)"></div>
      <!--Row2-->
      <div class="blocks" onclick="readGrid(this, 1, 0)"></div>
      <div class="blocks" onclick="readGrid(this, 1, 1)"></div>
      <div class="blocks" onclick="readGrid(this, 1, 2)"></div>
      <!--Row3-->
      <div class="blocks" onclick="readGrid(this, 2, 0)"></div>
      <div class="blocks" onclick="readGrid(this, 2, 1)"></div>
      <div class="blocks" onclick="readGrid(this, 2, 2)"></div>
    `;
  playerTurn = 1;
  turnsPlayed = 0;
  document.getElementById('footer').style = `
    display: none;
  `;
}
function readColors() {
  document.getElementById("player_color_1").value;
  p1Color = document.getElementById("player_color_1").value;
  p2Color = document.getElementById("player_color_2").value;
}
function updateScore() {
  document.getElementById("p1Score").innerHTML = "Score=" + player1Score;
  document.getElementById("p2Score").innerHTML = "Score=" + player2Score;
}
/***Sounds***/
function playSound() {
    let audio = new Audio();
    audio.src = "button.mp3";
    document.getElementById(audio);
    audio.play();
}
function playSoundWin() {
    let win = new Audio();
    win.src = "win.mp3";
    document.getElementById(win);
    win.play();
}
function startMusic() {
    document.getElementById('footer').style = `
      display: none;
    `;
    let music = new Audio();
    music.src = "backmusic.mp3";
    music.loop=true;
    document.getElementById(music);
    music.play();
}
