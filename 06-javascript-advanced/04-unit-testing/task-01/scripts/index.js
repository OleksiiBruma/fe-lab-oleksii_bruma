export default class Game{
  constructor(a) {
    this.count = 0;
    this.possibilities = ['.button--1', '.button--2', '.button--3', '.button--4'];
    this.currentGame = [];
    this.player = [];
    this.amountOfRounds = a;
  }
  clearGame() {
    this.currentGame = [];
    this.count = 0;
    this.addCount();
    document.querySelector(".box").removeEventListener("click",(e)=> this.addToPlayer(e.target.className));
    document.querySelector(".box").addEventListener("click",(e)=> this.addToPlayer(e.target.className));
  };
  newGame() {
    this.clearGame();
  }
  showMoves() {
    let i = 0;
    let moves = setInterval(function () {
      this.playGame(this.currentGame[i]);
      i++;
      if (i >= this.currentGame.length) {
        clearInterval(moves);
      }
    }.bind(this), 600);

    this.clearPlayer();
  }

  playGame(field) {

    document.querySelector(`${field}`).classList.add('hover');
    setTimeout(function () {
      document.querySelector(`${field}`).classList.remove('hover');
    }, 300);
  }
  clearPlayer() {
    this.player = [];
  }
  addToPlayer(target) {
    const field = target;
    switch(true) {
      case field.includes("button--1"):
        this.currentButton = ".button--1";
        this.player.push(this.currentButton);
        this.playerTurn(this.currentButton);
        break;

      case field.includes("button--2"):
        this.currentButton = ".button--2";
        this.player.push(this.currentButton);
        this.playerTurn(this.currentButton);
        break;
      case field.includes("button--3"):
        this.currentButton = ".button--3";
        this.player.push(this.currentButton);
        this.playerTurn(this.currentButton);
        break;
      case field.includes("button--4"):
        this.currentButton = ".button--4";
        this.player.push(this.currentButton);
        this.playerTurn(this.currentButton);
        break;
    }

  }
  playerTurn() {
    if (this.player[this.player.length - 1] !== this.currentGame[this.player.length - 1]) {
      alert("You lose!");
      this.newGame();
    } else {

      var check = this.player.length === this.currentGame.length;
      if (check) {
        if (this.count === this.amountOfRounds) {
          alert('You won! Congrats.');
        } else {
          alert('Next round!');
          this.nextLevel();
        }
      }

    }
  }
  nextLevel() {
    this.addCount();
  }
  generateMove() {
    this.currentGame.push(this.possibilities[(Math.floor(Math.random() * 4))]);
    this.showMoves();
  }
  addCount() {
    this.count++;
    document.querySelector(".counter").innerHTML = this.count;
    this.generateMove();
  }
};

 //const game = new Game();
 //game.newGame();

