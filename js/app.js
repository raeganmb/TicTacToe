const state = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  playersTurn: "X",
  winner: null,
};

const winConditions = [
  ["00", "01", "02"],
  ["00", "10", "20"],
  ["01", "11", "21"],
  ["02", "12", "22"],
  ["10", "11", "12"],
  ["20", "21", "22"],
  ["00", "11", "22"],
  ["20", "11", "02"],
];

const tabelEl = document.querySelector("table");
const messageEl = document.querySelector("#banner");

tabelEl.addEventListener("click", function (e) {
  let location = e.target.getAttribute("data-location");
  let arrayLocation1 = location[0];
  let arrayLocation2 = location[1];
  if (!state.board[arrayLocation1][arrayLocation2]) {
    e.target.innerHTML = state.playersTurn;
    state.board[arrayLocation1][arrayLocation2] = state.playersTurn;
    checkForWin(state.playersTurn);
  } else {
    switchTurn();
  }
});

init();

function checkForWin(player) {
  let playedArray = [];
  state.board.forEach(function (row, rowIdx) {
    row.forEach(function (box, boxIdx) {
      if (box === player) playedArray.push(`${rowIdx}${boxIdx}`);
    });
  });

  switchTurn();

  for (let condition of winConditions) {
    let winCounter = 0;
    condition.forEach(function (location) {
      if (playedArray.includes(location)) winCounter++;
    });
    if (winCounter === 3) {
      messageEl.innerHTML = `Player "${player}" wins!  `;
      let btn = document.createElement("button");
      btn.textContent = "restart";
      btn.addEventListener("click", init);
      messageEl.appendChild(btn);
      break;
    }
  }
}

function init() {
  state.board.forEach(function (row, rowIdx) {
    row.forEach(function (box, boxIdx) {
      state.board[rowIdx][boxIdx] = null;
    });
  });
  state.playersTurn = "X";
  render();
}

function render() {
  messageEl.innerHTML = "Player 'X' clicks a square to start the game!";

  state.board.forEach(function (row, rowIdx) {
    row.forEach(function (box, boxIdx) {
      tabelEl.children[0].children[rowIdx].children[boxIdx].textContent = box;
    });
  });
}

function switchTurn() {
  if (state.playersTurn === "X") {
    state.playersTurn = "O";
    messageEl.innerHTML = `It's Player ${state.playersTurn}'s turn.`;
  } else {
    state.playersTurn = "X";
    messageEl.innerHTML = `It's Player ${state.playersTurn}'s turn.`;
  }
}
