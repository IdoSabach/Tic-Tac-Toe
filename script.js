const main = (function () {
  const arr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const player = {
    name: "player",
    marker: "x",
  };

  const computer = {
    name: "computer",
    marker: "o",
  };

  let arrOf = [player.marker, computer.marker];

  const yourTurn = () => {
    let currIndex = 0;
    let currElement = arrOf[currIndex];
    currIndex = (currIndex + 1) % arrOf.length;
    return currElement
  };

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
