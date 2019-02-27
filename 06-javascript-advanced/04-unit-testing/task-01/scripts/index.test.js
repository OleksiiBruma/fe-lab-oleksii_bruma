const Game = require('./index.js');
test("handle clean game",()=>{
  expect(new Game()).toBeInstanceOf(Game);
});