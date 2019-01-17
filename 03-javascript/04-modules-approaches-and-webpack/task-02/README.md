## DESCRIPTION:

Using only ES5 language features create 3 Classes which describe Employee. 
One Abstract Class and two concrete implementations:
  
* First implementation `FixedSalaryEmployee` - Employee with fixed salary. Where average monthly salary is equal to employee the value of salary in JSON data.
  
* Second implementation `PerHourSalaryEmployee`- Employee with per-hour salary. Where hour rate is equal to the value of salary in JSON data, working day has 8 hours and month has 20.88 working days in average.

And create Collection class which is able to work with employees of different types.


## REQUIREMENTS:
1. Only CommonJS module format should be used for this task

1. Each class should be in separate file

1. Create **abstract** class `AbstractEmployee`:
    * constructor should accept object with fields `id` (string), `name` (string) and `salary` (number) and set them to corresponding instance fields.
    * constructor should throw if passed param doesn't match requirements above
    * as **abstract** constructor it should throw if called directly with `new`. It is supposed to be called only from sub-classes
    * create **abstract** method `getSalary` 

    > NOTE: You can find more info about about abstract class implementation here: https://stackoverflow.com/a/21220964

1. Create concrete sub-classes `FixedSalaryEmployee` and `PerHourSalaryEmployee` which inherit from `AbstractEmployee` and override its abstract `getSalary` method with correct implementation for given employye type.

1. Create `EmployeeCollection` class which represents collection of Employees:
    * Constructor should accept data from JSON file (Webpack allow you to just require JSON file, use it) and create instances of corresponding classes based on `type` field.
        * id should be generated in a format `id<number>` e.g. (`id0`, `id1` etc. for each item in collection)
    * Items in collection should be sorted by the next rules:
        * Sort all employees in descending order of average monthly salary.
        * If average monthly salary of employees is equal use employee name instead.
    
    * Implement method `getCollectionData` which allows to get id, name, average monthly salary for each employee in collection as array of objects.
  
    * Implement method `getFiveNames` which outputs an array with five first employee names from collection. Output example: `['Jo', 'Bob', 'Alice', 'Robb', 'Jenny']`
  
    * Implement `getThreeIds` which outputs as array of get last three employee ids from collection. Output example: `['id5', 'id4', 'id3']`

    * Implement `getCollectionAverage` which calculates and output average monthly salary for the whole collection of employees.

1. Create `package.json` and install `webpack` and `webpack-cli` as `devDependencies`
    * In `package.json` create 2 scripts `build:dev` and `build:prod` to bundle your files in development and production modes respectively.

1. In `index.js` file (that follow requirements from 0-config) require 2 files: provided `employees-collection.json` and file with `EmployeeCollection`.

1. Create `EmployeeCollection` instance using data from JSON file.

1. Include bundled script into provided `index.html` and fill `span` and `pre` blocks using data retrieved from collection methods.
    * Strings from arrays should be represented as values separated by comma and space character.
    * Collection data should be represented as pretty-printed JSON (see methonds and params of gloal `JSON` object)


## WORKFLOW:

Commit implemented task to git into

branch `03-javascript`

folder `03-javascript/04-modules-approaches-and-webpack/task-02`


Structure of the task should be:
```
<task folder>
|--- <folder with js files>
|    |--- employees-collection.json
|    \--- <other JS files>
|
|--- <folder with bundled js>
|--- index.html
|--- package.json
```

## SOURCES:

```
<task folder>
|--- employees-collection.json
|--- index.html
\--- README.md
```

## DEADLINE:

Due Date - 17-01-2019 23:59.

Penalty will be applied for each overdue day.
