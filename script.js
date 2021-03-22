const board = (() => {
  let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  //create DOM to replicate arr
  const arrToDOM = () => {
    tracker = document.createElement("div");
    tracker.textContent = "Tracker:";
    tracker.classList.add("tracker");
    document.body.appendChild(tracker);
    let gameContainer = document.createElement("div");
    gameContainer.classList.add("gameContainer");
    gameContainer.dataset.turn = "player1";
    document.body.appendChild(gameContainer);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        let box = document.createElement("div");
        box.dataset.type = "box";
        box.dataset.id = `${i}${j}`;
        box.dataset.i = i;
        box.dataset.j = j;
        box.textContent = "";
        gameContainer.appendChild(box);
      }
    }
  };

  //updates DOM based on play function inputs
  const updateDOM = (r, c, marker) => {
    let box = document.querySelector(`[data-id="${r}${c}"]`);
    box.textContent = marker;
  };

  //play function which will be accessed by player Obj
  const play = (r, c, marker) => (
    (arr[r][c] = marker),
    updateDOM(r, c, marker),
    turnsPlayed++,
    updateTracker()
  );

  //setting up players and boardStatus
  let currentPlayer = 1;
  let lastPlayer = 0;
  let status = "";
  let turnsPlayed = 0;

  const boxEventListener = () => {
    const boxes = document.querySelectorAll("[data-type='box']");
    boxes.forEach((box) =>
      box.addEventListener("click", (e) => {
        let r = e.target.dataset.i;
        let c = e.target.dataset.j;
        if (arr[r][c] == "X" || arr[r][c] == "O") {
          alert("already played here");
          return;
        }
        if (currentPlayer == 1) {
          playerOne.play(r, c);
          lastPlayer = 1;
          currentPlayer = 2;
        } else {
          playerTwo.play(r, c);
          lastPlayer = 2;
          currentPlayer = 1;
        }
      })
    );
  };

  //need write algorithm that checks for win/draw
  const checkStatus = () => {
    console.log(status, turnsPlayed);
    let objDiagonal1 = { X: 0, O: 0 };
    let objDiagonal2 = { X: 0, O: 0 };
    for (let i = 0; i < arr.length; i++) {
      let objHorizontal = { X: 0, O: 0 };
      let objVertical = { X: 0, O: 0 };
      if (arr[i][i] == "X" || arr[i][i] == "O") {
        objDiagonal1[arr[i][i]]++;
        if (objDiagonal1["X"] == 3 || objDiagonal1["O"] == 3) {
          if (lastPlayer == 1) {
            playerOne.win();
          } else if (lastPlayer == 2) {
            playerTwo.win();
          }
        }
      }
      let lastIndex = arr.length - 1;
      if (arr[i][lastIndex - i] == "X" || arr[i][lastIndex - i] == "O") {
        objDiagonal2[arr[i][lastIndex - i]]++;
        if (objDiagonal2["X"] == 3 || objDiagonal2["O"] == 3) {
          if (lastPlayer == 1) {
            playerOne.win();
          } else if (lastPlayer == 2) {
            playerTwo.win();
          }
        }
      }
      for (let j = 0; j < arr.length; j++) {
        if (arr[i][j] == "X" || arr[i][j] == "O") {
          objHorizontal[arr[i][j]]++;
          if (objHorizontal["X"] == 3 || objHorizontal["O"] == 3) {
            if (lastPlayer == 1) {
              playerOne.win();
            } else if (lastPlayer == 2) {
              playerTwo.win();
            }
          }
        }
      }
      for (let j = 0; j < arr.length; j++) {
        if (arr[j][i] == "X" || arr[j][i] == "O") {
          objVertical[arr[j][i]]++;
          if (objVertical["X"] == 3 || objVertical["O"] == 3) {
            if (lastPlayer == 1) {
              playerOne.win();
            } else if (lastPlayer == 2) {
              playerTwo.win();
            }
          }
        }
      }
    }
    if (turnsPlayed === 9 && board.status !== "won") {
      alert("draw");
      newGame();
    }
  };

  const updateTracker = () => {
    let tracker = document.querySelector(".tracker");
    if (currentPlayer == 1) {
      current = "PlayerTwo";
      marker = playerTwo.marker;
    } else {
      current = "PlayerOne";
      marker = playerOne.marker;
    }
    tracker.textContent = `${current}, ${marker}`;
  };

  const emptyDOM = () => {
    let gameGrid = document.querySelector(".gameContainer");
    document.body.removeChild(gameGrid);
    let tracker = document.querySelector(".tracker");
    document.body.removeChild(tracker);
  };

  const newGame = () => {
    arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    emptyDOM();
    arrToDOM();
    boxEventListener();
    currentPlayer = 1;
    lastPlayer = 0;
    status = "";
    turnsPlayed = 0;
  };
  return {
    arrToDOM,
    play,
    currentPlayer,
    boxEventListener,
    updateTracker,
    newGame,
    checkStatus,
    status,
    turnsPlayed,
  };
})();

board.arrToDOM();
board.boxEventListener();

let Player = function (name, marker) {
  const play = (r, c) => {
    board.play(r, c, marker);
    board.checkStatus();
  };

  const win = () => {
    board.status = "won";
    alert(`${name} has won the game`);
    board.newGame();
  };

  return { name, marker, play, win };
};
//function to make player play

<<<<<<< Updated upstream
let playerOne = Player("jeff", "X");
let playerTwo = Player("james", "O");
=======
let playerOne = Player("Amelie", "X");
let playerTwo = Player("AI", "O");
>>>>>>> Stashed changes
