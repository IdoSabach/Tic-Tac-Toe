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

  pubsub.subscribe("insertMarker" ,gameFlow)
  pubsub.subscribe("resetBoard",restartGame)
  pubsub.subscribe("checkIfEmpty",checkIfEmpty)

  const arrOfBoard = Array(9).fill(null);
  // pubsub.publish("arrOfBoard",arrOfBoard)

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

    if (arrOfBoard[index]===null) {
      curr.moves.push(parseInt(index));
      arrOfBoard[index] = curr.marker
      // console.log(curr.moves);
      // console.log(arrOfBoard);
      updateBoxContent(index);
    }else{
      return
    }

    if (curr.moves.length>2){
      let bool = finishGame(curr.moves)
      if(bool){
        // setTimeout(()=>{
        //   pubsub.publish("restartBtn",curr.name)
        // },1000)
        pubsub.publish("restartBtn",curr.name)
      }else if (player.moves.length + computer.moves.length === 9) {
        pubsub.publish("restartBtn")
      }
    } 
    
    switchPlayer()
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
    pubsub.publish("turn",curr.name)
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
    // console.log("hi" + arrToCheck)
    return winningMovies.some((winningCombo) =>
      winningCombo.every((position) => arrToCheck.includes(position))
    );
  }

  function restartGame() {
    player.moves = [];
    computer.moves = [];
    curr = player;
    arrOfBoard.fill(null);
    pubsub.publish("cleanBoard")
  }
}


function dom() {

  pubsub.subscribe("restartBtn",restartBtnChange)
  pubsub.subscribe("cleanBoard",cleanBoard)
  pubsub.subscribe("turn",yourTurn)

  const yourName = document.querySelector(".name-player");
  const popup = document.querySelector(".popup-start");
  const input = document.querySelector(".input-of-popup");
  const btn = document.querySelector(".startGame");
  const box = document.querySelectorAll(".box");
  const restartBtn = document.querySelector(".restart-btn"); 
  const player = document.querySelector(".name-player")
  const computer = document.querySelector(".name-computer")
  const winPopup = document.querySelector(".popup-to-win")
  const txtWinPopup = document.querySelector(".text-of-popup-win")


  function restartBtnChange(name){
    restartBtn.style.display = 'flex';
    winPopup.style.display = 'flex';
    if(name===undefined){
      txtWinPopup.textContent = 'draw!!'
    }else{
      txtWinPopup.textContent = `${name} won!!!`
    }
    
    
  }

  function yourTurn(curr){
    if(curr === 'player'){
      player.style["background-color"] = '#d0d7da'
      computer.style["background-color"] = '#edf6f9'
    }else{
      computer.style["background-color"] = '#d0d7da'
      player.style["background-color"] = '#edf6f9'
    }
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const nameUser = input.value;
    if (nameUser === "") {
      alert("Enter your name!");
    } else {
      popup.style.display = "none";
      yourName.textContent = `player: ${nameUser} (x)`;
    }
  });

  restartBtn.addEventListener('click',()=>{
    pubsub.publish("resetBoard")
    restartBtn.style.display = 'none';
    winPopup.style.display = 'none';

    player.style["background-color"] = '#d0d7da'
    computer.style["background-color"] = '#edf6f9'
  })

  box.forEach((btnOdBoard) => {
    btnOdBoard.addEventListener("click", function (e) {
      let num = e.target.dataset.num;
      pubsub.publish("insertMarker",num)
    });
  });

  
  function cleanBoard() {
    box.forEach((btn) => {
      btn.textContent = "";
    });
  }
}

const main = (function(){
  dom()
  setGame()
})()
