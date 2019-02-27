const Game = require('./index.js');
test("handle clean game",()=>{
  expect(new Game()).toBeInstanceOf(Game);
});
test("check constructor of the class game",()=>{
  const obj = new Game(20);
  expect(obj.amountOfRounds).toBe(20);
});
test("consists of basic properties", ()=>{
 const obj = new Game(20);
 expect(obj.amountOfRounds).toBe(20);
 expect(obj.count).toBe(0);
 expect(obj.possibilities).toHaveLength(4);
  expect(obj.currentGame).toHaveLength(0);
  expect(obj.player).toHaveLength(0)
});
test("clearGame method should reset basic properties and run addCount method",()=>{
  const obj = new Game(20);
  document.body.innerHTML =
      '<div class="box">' +
      '</div>';
  obj.addCount = jest.fn();
  obj.addToPlayer = jest.fn();
  obj.clearGame();
  document.querySelector(".box").click();
  expect(obj.addToPlayer).toHaveBeenCalled()
  expect(obj.addCount).toHaveBeenCalled();
  expect(obj.amountOfRounds).toBe(20);
  expect(obj.count).toBe(0);
  expect(obj.possibilities).toHaveLength(4);
  expect(obj.currentGame).toHaveLength(0);
  expect(obj.player).toHaveLength(0)
});
