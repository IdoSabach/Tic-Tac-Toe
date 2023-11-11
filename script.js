const main = (function () {
  const arr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const player = {
    name: "player",
    marker: "x",
    arrPlayer: []
  };

  const computer = {
    name: "computer",
    marker: "o",
    arrComputer: []
  };

  const winningMovies = [  
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  let arrOf = [player.marker, computer.marker];

  const finishGame = () => {
    if (
      (arr[0][0] === player.marker &&
        arr[0][1] === player.marker &&
        arr[0][2] === player.marker) ||
      (arr[1][0] === player.marker &&
        arr[1][1] === player.marker &&
        arr[1][2] === player.marker) ||
      (arr[2][0] === player.marker &&
        arr[2][1] === player.marker &&
        arr[2][2] === player.marker) ||
      (arr[0][0] === player.marker &&
        arr[1][0] === player.marker &&
        arr[2][0] === player.marker) ||
      (arr[0][1] === player.marker &&
        arr[1][1] === player.marker &&
        arr[2][1] === player.marker) ||
      (arr[0][2] === player.marker &&
        arr[1][2] === player.marker &&
        arr[2][2] === player.marker) ||
      (arr[0][0] === player.marker &&
        arr[1][1] === player.marker &&
        arr[2][2] === player.marker) ||
      (arr[2][0] === player.marker &&
        arr[1][1] === player.marker &&
        arr[0][2] === player.marker)
    ) {
      alert(`${player.name} you win!`);
    } else if (
      (arr[0][0] === computer.marker &&
        arr[0][1] === computer.marker &&
        arr[0][2] === computer.marker) ||
      (arr[1][0] === computer.marker &&
        arr[1][1] === computer.marker &&
        arr[1][2] === computer.marker) ||
      (arr[2][0] === computer.marker &&
        arr[2][1] === computer.marker &&
        arr[2][2] === computer.marker) ||
      (arr[0][0] === computer.marker &&
        arr[1][0] === computer.marker &&
        arr[2][0] === computer.marker) ||
      (arr[0][1] === computer.marker &&
        arr[1][1] === computer.marker &&
        arr[2][1] === computer.marker) ||
      (arr[0][2] === computer.marker &&
        arr[1][2] === computer.marker &&
        arr[2][2] === computer.marker) ||
      (arr[0][0] === computer.marker &&
        arr[1][1] === computer.marker &&
        arr[2][2] === computer.marker) ||
      (arr[2][0] === computer.marker &&
        arr[1][1] === computer.marker &&
        arr[0][2] === computer.marker)
    ) {
      alert(`${computer.name} you win!`);
    } else {
      alert("Draw");
    }
  };

  const startGame = () => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        let random = Math.floor(Math.random() * arrOf.length);
        arr[i][j] = arrOf[random];
      }
    }
    console.log(arr);
    finishGame();
  };

  return {
    startGame,
  };
})();

// let random = Math.floor(Math.random() * arrOf.length)
// arr[i][j] = arrOf[random]
