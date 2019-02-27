const Game = require('./index.js');
test("handle clean game",()=>{
  expect(new Game()).toBeInstanceOf(Game);
});
test("check constructor of the class game",()=>{
  const obj = new Game(20);
  expect(obj.amountOfRounds).toBe(20);
});