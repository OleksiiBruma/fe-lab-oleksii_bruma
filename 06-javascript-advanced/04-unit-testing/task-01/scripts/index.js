module.exports = class Game{
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
    document.querySelector(".box").addEventListener("click",(e)=> this.addToPlayer(e.target.classList))
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
};