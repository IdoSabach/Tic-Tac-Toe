const main = (function () {
  const yourName = document.querySelector(".name-player");
  const popup = document.querySelector(".popup-start");
  const input = document.querySelector(".input-of-popup");
  const btn = document.querySelector(".startGame");
  const box = document.querySelectorAll(".box");

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
      if(checkIfEmpty(num)){
        btnOdBoard.textContent = curr.marker
      }
      gameFlow(num);
    });
  });

  const myArray = Array(9).fill(null);
  function getInMarker(num){
    myArray[num] = curr.marker
    console.log(myArray)
  }
  

  const player = {
    name: input.value,
    marker: "x",
    arrToWin: [],
  };

  

  const computer = {
    name: "root",
    marker: "o",
    arrToWin: [],
  };

  let curr = player;

  function gameFlow(index) {
    if(!checkIfEmpty(index)){
      return
    }else{
      getInMarker(index)
      curr.arrToWin.push(index);
      console.log(curr.arrToWin);
    }

    if (finishGame(curr.arrToWin)) {

      if(curr.name === player){
        alert(`${curr.name} win!!!`);
      }else if(curr.name === computer){
        alert(`${curr.name} lose!!!`);
      }
      restartGame();

    } else if (player.arrToWin.length + computer.arrToWin.length === 9) {
      alert("draw!!!");
      restartGame();
    } else {
      switchPlayer();
    }
  }

  function switchPlayer(){
    if(curr===player){
      curr = computer
    }else{
      curr = player
    }
  }

  function checkIfEmpty(index){
    if(myArray[index]===null){
      return true
    }else{
      return false
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
    player.arrToWin = [];
    computer.arrToWin = [];
    curr = player;
    cleanBoard()
  }

  function cleanBoard(){
    box.forEach((btn)=>{
      btn.textContent = ""
    })
    myArray.fill(null)
  }



  return {
    gameFlow,
  };
})();