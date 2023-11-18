const pubsub = {
  events: {},
  subscribe(evName, fn) {
    // console.log(`PUBSUB: someone just subscribed to know about ${evName}`);
    // add an event with a name as new or to existing list
    this.events[evName] = this.events[evName] || [];
    this.events[evName].push(fn);
  },
  unsubscribe(evName, fn) {
    // console.log(`PUBSUB: someone just UNsubscribed from ${evName}`);
    // remove an event function by name
    if (this.events[evName]) {
      this.events[evName] = this.events[evName].filter((f) => f !== fn);
    }
  },
  publish(evName, data) {
    // console.log(`PUBSUB: Making an broadcast about ${evName} with ${data}`);
    // emit|publish|announce the event to anyone who is subscribed
    if (this.events[evName]) {
      this.events[evName].forEach((f) => {
        f(data);
      });
    }
  },
};

function setGame() {
  pubsub.subscribe("insertMarker", gameFlow);
  pubsub.subscribe("resetBoard", restartGame);
  pubsub.subscribe("checkIfEmpty", checkIfEmpty);
  pubsub.subscribe("getBox", getBox);
  pubsub.subscribe("getNamePlayerOne", getNamePlayerOne);
  pubsub.subscribe("getNamePlayerTwo", getNamePlayerTwo);

  const arrOfBoard = Array(9).fill(null);

  function getNamePlayerOne(name) {
    player.name = name;
  }
  function getNamePlayerTwo(name) {
    computer.name = name;
  }

  const player = {
    name: "",
    marker: "X",
    moves: [],
  };

  const computer = {
    name: "",
    marker: "O",
    moves: [],
  };

  let scorePlayer = 0;
  let scoreComputer = 0;

  let curr = player;

  function getBox(btn) {
    btn.textContent = curr.marker;
  }

  function gameFlow(index) {
    if (arrOfBoard[index] === null) {
      curr.moves.push(parseInt(index));
      arrOfBoard[index] = curr.marker;
      pubsub.publish("updateBoxContent", index);
    } else {
      return;
    }

    if (curr.moves.length > 2) {
      let bool = finishGame(curr.moves);
      if (bool) {
        if (curr.name === player.name) {
          scorePlayer += 1;
          pubsub.publish("updatePlayer",scorePlayer)
        } else if (curr.name === computer.name) {
          scoreComputer += 1;
          pubsub.publish("updateComputer",scoreComputer)
        }
        pubsub.publish("restartBtn", curr.name);
      } else if (player.moves.length + computer.moves.length === 9) {
        pubsub.publish("restartBtn");
      }
    }
    switchPlayer();
  }

  function switchPlayer() {
    if (curr === player) {
      curr = computer;
    } else {
      curr = player;
    }
    pubsub.publish("turn", curr.name);
  }

  function checkIfEmpty(index) {
    if (arrOfBoard[index] === null) {
      return true;
    } else {
      return true;
    }
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
    player.moves = [];
    computer.moves = [];
    curr = player;
    arrOfBoard.fill(null);
    pubsub.publish("cleanBoard");
  }
}

function dom() {
  pubsub.subscribe("restartBtn", restartBtnChange);
  pubsub.subscribe("cleanBoard", cleanBoard);
  pubsub.subscribe("turn", yourTurn);
  pubsub.subscribe("updateBoxContent", updateBoxContent);
  
  pubsub.subscribe("updatePlayer", updatePlayer);
  pubsub.subscribe("updateComputer", updateComputer);

  const yourName = document.querySelector(".name-player");
  const popup = document.querySelector(".popup-start");
  const inputOne = document.querySelector(".input-of-popup-player-1");
  const inputTwo = document.querySelector(".input-of-popup-player-2");
  const btn = document.querySelector(".startGame");
  const box = document.querySelectorAll(".box");
  const restartBtn = document.querySelector(".restart-btn");
  const player = document.querySelector(".name-player");
  const computer = document.querySelector(".name-computer");
  const winPopup = document.querySelector(".popup-to-win");
  const txtWinPopup = document.querySelector(".text-of-popup-win");
  const scorePlayer = document.querySelector(".score-player");
  const scoreComputer = document.querySelector(".score-computer");

  function updatePlayer(x){
    scorePlayer.textContent = `Score: ${x}`
  }

  function updateComputer(x){
    scoreComputer.textContent = `Score: ${x}`
  }

  function updateBoxContent(index) {
    const boxToUpdate = document.querySelector(`.box[data-num="${index}"]`);
    pubsub.publish("getBox", boxToUpdate);
  }

  function restartBtnChange(name) {
    restartBtn.style.display = "flex";
    winPopup.style.display = "flex";
    if (name === undefined) {
      txtWinPopup.textContent = "draw!";
    } else {
      txtWinPopup.textContent = `${name} won!`;
    }
  }

  function yourTurn(curr) {
    if (curr === inputOne.value) {
      player.style["background-color"] = "#d0d7da";
      computer.style["background-color"] = "#edf6f9";
    } else {
      computer.style["background-color"] = "#d0d7da";
      player.style["background-color"] = "#edf6f9";
    }
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const nameUserOne = inputOne.value;
    pubsub.publish("getNamePlayerOne", nameUserOne);
    const nameUserTwo = inputTwo.value;
    pubsub.publish("getNamePlayerTwo", nameUserTwo);
    if (nameUserOne === "" || nameUserTwo === "") {
      alert("Enter your name!");
    } else {
      popup.style.display = "none";
      yourName.textContent = `player 1: ${nameUserOne} (X)`;
      computer.textContent = `player 2 : ${nameUserTwo} (O)`;
    }
  });

  restartBtn.addEventListener("click", () => {
    pubsub.publish("resetBoard");
    restartBtn.style.display = "none";
    winPopup.style.display = "none";

    player.style["background-color"] = "#d0d7da";
    computer.style["background-color"] = "#edf6f9";
  });

  box.forEach((btnOdBoard) => {
    btnOdBoard.addEventListener("click", function (e) {
      let num = e.target.dataset.num;
      playerMove(num);
    });
  });

  function playerMove(num) {
    pubsub.publish("insertMarker", num);
  }

  function cleanBoard() {
    box.forEach((btn) => {
      btn.textContent = "";
    });
  }
}

const main = (function () {
  dom();
  setGame();
})();
