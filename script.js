const main = (function () {

  const yourName = document.querySelector(".name-player");
  const popup = document.querySelector(".popup-start");
  const input = document.querySelector(".input-of-popup");
  const btn = document.querySelector(".startGame");

  const box = document.querySelectorAll(".box");
  const borderPlayer = document.querySelector(".name-player");
  const borderComputer = document.querySelector(".name-computer");

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


  const arr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const player = {
    name: "player",
    marker: "x",
    arrPlayer: [],
  };

  const computer = {
    name: "computer",
    marker: "o",
    arrComputer: [],
  };

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

  let arrOf = [player.marker, computer.marker];

  function finishGame(arr){
    const win = winningMovies.some((winning)=>
      winning.every((here) => arr.includes(here))
    )
    if(win){
      alert('you wun')
    }else{
      alert("no")
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
    finishGame,
  };
})();
