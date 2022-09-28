const state = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  //   players: ["x", "o"],
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

// grab the table element
const tabelEl = document.querySelector("table");
const messageEl = document.querySelector("#banner");

// table.listen(click, register move)
tabelEl.addEventListener("click", function (e) {
  //check where we clicked on the board
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

// in memory rep of the board (2d array)

//on load set the 2d array to have null spaces
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
  //   tabelEl.children[0].children.forEach(function (tr, rowIdx) {
  //     tr.children.forEach(function (td, tdIdx) {
  //       td.textContent = state.board[rowIdx][tdIdx];
  //     });
  //   });

  messageEl.innerHTML = "Player 'X' clicks a square to start the game!";

  state.board.forEach(function (row, rowIdx) {
    row.forEach(function (box, boxIdx) {
      tabelEl.children[0].children[rowIdx].children[boxIdx].textContent = box;
    });
  });
}

//when we click the board we should change whos turn it is

//on each click we should see if there is a winner

function switchTurn() {
  if (state.playersTurn === "X") {
    state.playersTurn = "O";
    messageEl.innerHTML = `It's Player ${state.playersTurn}'s turn.`;
  } else {
    state.playersTurn = "X";
    messageEl.innerHTML = `It's Player ${state.playersTurn}'s turn.`;
  }
}
