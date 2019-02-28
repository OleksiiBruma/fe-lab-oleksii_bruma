DESCRIPTION:

Task has two parts:
- part 1 - Refactor existing code, add docs
- part 2 - Cover refactored code with unit tests

NOTE: The parts will be evaluated separately (like separate tasks)


Part 1

REQUIREMENTS:

Rewrite existing code to make it more understandable, supportable, testable and clear.
Support Chrome.

For js use:
- conventional approaches and avoid hardcode, code repeating etc
- single responsibility principle
- patterns: DRY, KISS and YAGNI
- documentation; cover code with docs, add script to generate documentation
- linting utility ESLint [ESLint getting started](https://eslint.org/docs/user-guide/getting-started)
- README.md - how to start the app, how to generate docs

Refactoring of JavaScript code is obligatory, html and css - as a bonus task


SOURCES:

* jquery-2.1.4.min.js
* index.html
* styles.css
* main.js


Part 2

REQUIREMENTS:

After refactoring the code from the first part, you need to cover this modified code with unit tests.
You can use Jest and Sinon. Test coverage should be ~100 percent.
Update README.md - how to run tests

SOURCES:

* [Jest](https://facebook.github.io/jest/);
* [Sinon](http://sinonjs.org/);
* `main.js` from completed `Part 1`.


WORKFLOW:

Upload implemented task to git in appropriate branch into folder `./05-code-quality-and-docs`.
Structure of the task should be:
```
  05-code-quality-and-docs
    task-01
      src
        css
          styles.css
        js
          main.js
          main.test.js   // should appear for 'part 2'
          jquery-2.1.4.min.js
        index.html
      package.json
      README.md
```


DEADLINE:

Due Date - 26.02.2019.
Penalty - minus 1 score for each overdue day.
