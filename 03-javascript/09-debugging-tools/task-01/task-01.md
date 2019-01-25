**Part 1**
1. Open devtools;
2. Go to source by clicking `app-view.js:137` on the right;
3. Set the breakpoint on the line above;
3. We see that console.log works in an inappropriate way. Using `ctrl+F` and typing `"console"` we can find out that on the fourth line
 "console" is an argument of the function. So now we just need to delete it;
4. PROFIT!

**Part 2**
1. Walking through the all files webStorm notify me that there is a typo in word `"completed"` (`todos.js:21`);
2. Correct typo;
3. PROFIT!

