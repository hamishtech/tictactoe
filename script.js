const board = (() => {
  let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  //create DOM to replicate arr
  const arrToDOM = () => {
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
        box.textContent = arr[i][j];
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
    (arr[r][c] = marker), updateDOM(r, c, marker)
  );

  //setting up players
  let currentPlayer = 0;

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
          currentPlayer = 2;
        } else {
          playerTwo.play(r, c);
          currentPlayer = 1;
        }
      })
    );
  };
  //need write algorithm that checks for win/draw
  const checkStatus = () => {
    if (arr[0][0] == "X" && arr[0][1] == "X" && arr[0][2] == "X") {
      alert("game is won");
    }
  };
  const refresh = () => {
    arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    console.table(arr);
  };
  return {
    arr,
    arrToDOM,
    play,
    currentPlayer,
    boxEventListener,
    checkStatus,
    refresh,
  };
})();

board.arrToDOM();
board.boxEventListener();

let Player = function (name, marker) {
  if (board.currentPlayer == 0) {
    board.currentPlayer = 1;
  }
  const play = (r, c) => {
    board.play(r, c, marker);
    board.checkStatus();
  };
  return { name, marker, play };
};
//function to make player play

let playerOne = Player("jeff", "X");
let playerTwo = Player("james", "O");
