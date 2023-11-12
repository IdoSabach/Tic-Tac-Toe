const main = (function () {
  const yourName = document.querySelector(".name-player");
  const popup = document.querySelector(".popup-start");
  const input = document.querySelector(".input-of-popup");
  const btn = document.querySelector(".startGame");

  const box = document.querySelectorAll(".box");
  // const borderPlayer = document.querySelector(".name-player");
  // const borderComputer = document.querySelector(".name-computer");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const nameUser = input.value;
    if (nameUser === "") {
      alert("Enter your name!");
    } else {
      popup.style.display = "none";
      yourName.textContent = `player: ${nameUser}`;
    }
  });

  box.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      btn.textContent = curr.marker
      let num = e.target.dataset.num;
      gameFlow(num);
    });
  });

  const arr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const player = {
    name: "player",
    marker: "x",
    arrOf: [],
  };

  const computer = {
    name: "computer",
    marker: "o",
    arrOf: [],
  };

  let curr = player;

  function gameFlow(index) {
    if(!checkIfEmpty(index)){
      return
    }
    
    curr.arrOf.push(index);
    console.log(curr.arrOf);

    if (finishGame(curr.arrOf)) {
      alert(`${curr.name} win!!!`);
    } else if (player.arrOf.length + computer.arrOf.length === 9) {
      alert("draw!!!");
      restartGame();
    } else {
      if (curr === player) {
        curr = computer;
      } else {
        curr = player;
      }
    }
  }

  function checkIfEmpty(index){
    return !player.arrOf.includes(index) && !computer.arrOf.includes(index)
  }

  const winningMovies = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function finishGame(arrToCheck) {
    return winningMovies.some((winningCombo) =>
      winningCombo.every((position) => arrToCheck.includes(position))
    );
  }

  function restartGame() {
    player.arrOf = [];
    computer.arrOf = [];
    curr = player;
  }


  return {
    gameFlow,
  };
})();
