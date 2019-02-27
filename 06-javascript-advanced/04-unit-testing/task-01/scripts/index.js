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
};