const PubSub = (function () {
  const events = {};

  function subscribe(eventName, callback) {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);
  }

  function publish(eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach((callback) => callback(data));
    }
  }

  return {
    subscribe,
    publish,
  };
})();

const main = (function () {
  const myArray = Array(9).fill(null);
  function getInMarker(num) {
    myArray[num] = curr.marker;
    console.log(myArray);
  }

  const player = {
    name: "player",
    marker: "x",
    moves: [],
  };

  const computer = {
    name: "root",
    marker: "o",
    moves: [],
  };

  let curr = player;

  function gameFlow(index) {
    if (!checkIfEmpty(index)) {
      return;
    } else {
      getInMarker(index);
      curr.moves.push(index);
      console.log(curr.moves);
      updateBoxContent(index);
    }

    if (finishGame(curr.moves)) {
      if (curr.name === player) {
        PubSub.publish("gameResult", `${curr.name} win!!!`);
      } else if (curr.name === computer) {
        PubSub.publish("gameResult", `${curr.name} lose!!!`);
      }
      restartGame();
    } else if (player.moves.length + computer.moves.length === 9) {
      PubSub.publish("gameResult", "It's a draw!!!");
      restartGame();
    } else {
      PubSub.publish("switchPlayer");
    }
  }

  function updateBoxContent(index) {
    const boxToUpdate = document.querySelector(`.box[data-num="${index}"]`);
    boxToUpdate.textContent = curr.marker;
  }

  function switchPlayer() {
    if (curr === player) {
      curr = computer;
    } else {
      curr = player;
    }
  }

  function checkIfEmpty(index) {
    if (myArray[index] === null) {
      return true;
    } else {
      return false;
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
    PubSub.publish("cleanBoard");
  }

  PubSub.subscribe("gameFlow", gameFlow);

  return {
    PubSub,
    checkIfEmpty,
    switchPlayer,
    curr,
    myArray,
  };
})(PubSub);

const interFace = (function (main) {
  const yourName = document.querySelector(".name-player");
  const popup = document.querySelector(".popup-start");
  const input = document.querySelector(".input-of-popup");
  const btn = document.querySelector(".startGame");
  const box = document.querySelectorAll(".box");

  main.PubSub.subscribe("switchPlayer", main.switchPlayer);
  main.PubSub.subscribe("cleanBoard", cleanBoard);
  main.PubSub.subscribe("gameResult", showGameResult);

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

  box.forEach((btnOdBoard) => {
    btnOdBoard.addEventListener("click", function (e) {
      let num = e.target.dataset.num;
      if (main.checkIfEmpty(num)) {
        btnOdBoard.textContent = main.curr.marker;
      }
      main.PubSub.publish("gameFlow", num);
    });
  });
  function cleanBoard() {
    box.forEach((btn) => {
      btn.textContent = "";
    });
    main.myArray.fill(null);
  }

  function showGameResult(result) {
    alert(result);
  }
})(main);
