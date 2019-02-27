const Game = require('./index.js');
describe('class', () => {

  test("handle clean game", () => {
    expect(new Game()).toBeInstanceOf(Game);
  });

  test("check constructor of the class game", () => {
    const obj = new Game(20);

    expect(obj.amountOfRounds).toBe(20);
  });

  test("consists of basic properties", () => {
    const obj = new Game(20);

    expect(obj.amountOfRounds).toBe(20);
    expect(obj.count).toBe(0);
    expect(obj.possibilities).toHaveLength(4);
    expect(obj.currentGame).toHaveLength(0);
    expect(obj.player).toHaveLength(0)
  });
});
describe('methods', () => {

  test("clearGame method should reset basic properties and run addCount method", () => {
    const obj = new Game(20);

    document.body.innerHTML =
        '<div class="box">' +
        '</div>';
    obj.addCount = jest.fn();
    obj.addToPlayer = jest.fn();
    obj.clearGame();
    document.querySelector(".box").click();
    expect(obj.addToPlayer).toHaveBeenCalled();
    expect(obj.addCount).toHaveBeenCalled();
    expect(obj.amountOfRounds).toBe(20);
    expect(obj.count).toBe(0);
    expect(obj.possibilities).toHaveLength(4);
    expect(obj.currentGame).toHaveLength(0);
    expect(obj.player).toHaveLength(0)
  });

  test("method newGame should run clearGame method", () => {
    const obj = new Game(20);
    obj.clearGame = jest.fn();

    obj.newGame();
    expect(obj.clearGame).toHaveBeenCalled();
  });
  test("method showMoves should run clearGame method playGame, currentGame, and clearPlayer", () => {
    const obj = new Game(20);
    obj.playGame = jest.fn();
    obj.currentGame = [1];
    obj.clearPlayer = jest.fn();
    obj.showMoves();
    expect(obj.clearPlayer).toHaveBeenCalled();
  });
  test("playGame method should add and then remove hover class", () => {
    jest.useFakeTimers();

    document.body.innerHTML =
        '<div class="box">' +
        '</div>';

    const obj = new Game(20);

    obj.playGame(".box");
    expect(document.querySelector(".box").classList.contains("hover")).toBeTruthy();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
  test("clearPlayer method should clear player property", () => {
    const obj = new Game(20);
    obj.clearPlayer();
    expect(obj.player).toHaveLength(0);
  });
  test("addToPlayer method should add target to player and run playerTurn method", () => {
    const obj = new Game(20);
    obj.player = [];
    obj.playerTurn = jest.fn();
    obj.addToPlayer("button--1");
    expect(obj.currentButton).toBe(".button--1");
    obj.addToPlayer("button--2");
    expect(obj.currentButton).toBe(".button--2");
    obj.addToPlayer("button--3");
    expect(obj.currentButton).toBe(".button--3");
    obj.addToPlayer("button--4");
    expect(obj.currentButton).toBe(".button--4");
    expect(obj.playerTurn).toHaveBeenCalledTimes(4);
    expect(obj.player).toHaveLength(4);
  });
  test("playerMethod when last property is not equal between player and currentGame should run newGame",()=>{
    const obj = new Game(20);
    obj.player=[1];
    obj.currentGame=[2];
    obj.newGame = jest.fn();
    obj.playerTurn();
    expect(obj.newGame).toHaveBeenCalled();
  });
  test("playerMethod when last property is equal between player and currentGame  and currentRound equal to amount of rounds then game ends",()=>{
    const obj = new Game(20);
    obj.player=[1];
    obj.currentGame=[1];
    obj.count= 3;
    obj.amountOfRounds = 3;
    global.alert = jest.fn();
    obj.newGame = jest.fn();
    obj.playerTurn();
    expect(alert).toHaveBeenCalled();
  });
  test("playerMethod when last property is equal between player and currentGame  and currentRound not equal to amount of rounds then game ends",()=>{
    const obj = new Game(20);
    obj.player=[1];
    obj.currentGame=[1];
    obj.count= 2;
    obj.amountOfRounds = 3;
    obj.nextLevel = jest.fn();
    global.alert = jest.fn();
    obj.newGame = jest.fn();
    obj.playerTurn();
    expect(alert).toHaveBeenCalled();
    expect(obj.nextLevel).toHaveBeenCalled();
  })
});

