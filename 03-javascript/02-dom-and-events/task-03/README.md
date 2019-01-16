## DESCRIPTION

This task consist of two parts:
1. Implement `multiplicationTable` function, which produces values to createmultiplication table
2. Generate HTML table based on content produced by `multiplicationTable` and add several interaction to it

## REQUIREMENTS

### Part 1: Generate multiplication table

In file `js/multiplication-table.js` implement function `multiplicationTable` which takes three numeric arguments and returns two dimensional array which contais data required to render multiplication table.
`multiplicationTable(colStart, rowStart, size) {...}`
* `colStart` - (integer) start value for numbers in columns
* `rowsStart` - (integer) start value for numbers in rows
* `size`- (integer) size of the table

Call `const table = multiplicationTable(1, 3, 4)` should result in next two dimensional array
```
[
    [null, 1, 2, 3, 4],
    [3, 3, 6, 9, 12],
    [4, 4, 8, 12, 16],
    [5, 5, 10, 15, 20],
    [6, 6, 12, 18, 24]
]
```
* `table[0]` describes row with columns headings
* `table[0][0]` is always `null` - this will correspond to empty top left cell of the table.
* `table[i][0]` describe row heading (where `i` is any index)

* `table[0][1]` is equal to `colStart`

* `table[1][0]` is equal to `rowStart`

* `table[1][1]` is equal to is equal to the product of two numbers `table[1][0]` and `table[0][1]`
* `table[1][2]` is equal to is equal to the product of two numbers `table[1][0]` and `table[0][2]`
* and so one...

* Number of colums and rows should be equal to `size + 1` since there are headings.

* If any os passed arguments is not a number or is less than 1 function should throw an exeption `Function requires three integer arguments that are greater or equalt than 1`.

### Part 2: DOM manipulations & events

This task is about generating HTML tables and adding some behavior to it, that produces visual feedback to user.

> **[ -warning- ]** there are several cases which should be avoided, as they might negatively impact the mark. Such cases are indicated with **[ -warning- ]**

You have to complete this task with native JS code - so use `js/table.js` to put your code.
You need to add little CSS for this task, to highlight some of the elements.
That's OK to add other styles, but is not the task's purpose (other styles are optional).

In `index.html`, you have already all the markup you need to complete the task.

There you will find:

* `<table>` : it will contain your generated output.
* `<form>` with following control elements
    * `<input type="number">` * 3 fields: 	they will define start numbers and size of resulting table
	* `<button>` : 	that generates table content.

> NOTE: Pressing `ENTER` key (in any input field) should use same event handler, as button (custom form submit)

> **[ -warning- ]** You should NOT further modify HTML.

#### USER SCENARIO

*WHEN* you fill input fields with numbers (e.g. `1`, `3`, `4` respoctively)
*AND* you submit form (press the Button or `ENTER` key)
*THEN* data from input fields should be converted to numbers and passed to `multiplicationTable`
*AND* result of `multiplicationTable` should be rendered as table (5 rows * 5 columns in example) each of the table cell should contain value from respective array emement.



Expected markup structure:

|       | **1** | **2** | **3** | **4** |
|-------|-------|-------|-------|-------|
| **3** |   3   |   6   |   9   |   12  |
| **4** |   4   |   8   |   12  |   16  |
| **5** |   5   |   10  |   15  |   20  |
| **6** |   6   |   12  |   18  |   24  |

#### Requirements: Table generation

There are requirements to how the table should be generated:

1. you should dynamically create cells with **native JS**
2. you should accumulate your nodes inside of `DocumentFragment` & replace exisiting content inside the `<table>` with your result, when content generation is finished  [^DocumentFragment]
3. table heading
    * use `th` elements for each colum heading (first array in two dimensional array returned from `multiplicationTable`)
    * use `th` elements for each row heading (first element of each nested array)
    * Element that contains `null` should be rendered as empty `th` cell
4. valid `<table>` [DOM structure](https://css-tricks.com/complete-guide-table-element/). Usage of row group tags is advised.


#### Requirements: Behavior

When your table is successfully generated, it’s time for the second part of this task:
add behavior to your table. So, here’s the plan:

##### Hover

*WHEN* moving the cursor over the table cell (mouse hover),  
*THEN* each of the cells should react by highlighting itself AND its respective *column heading* (in header section) and *row heading* (on the left-hand side of the table)

> **[ -warning- ]**
> you should not rely on parsing content from cell text to find appropriate cell in header.

Instead, you may save values somehow, or track/iterate with method borrowing from `Array` (or old-school loops).

**Recommended approach**

*highlighting*: setting specific CSS-class. CSS implementation is up to you.
Highlighted element should provide clear visible visual feedback, like larger font size or/and different background.  

*hover event*:  use event delegation  


> **[ -warning- ]** **Not recommended approach**
>
> *highlighting*: changing JS properties on ElementNode. In fact this is same as setting inline styles.  
>
> *hover event*:  attach listeners to every generated node.  


##### Click

*WHEN* single click cell  
*AND* `ctrl` key WAS NOT pressed  
*THEN* the its whole row should MOVE UP  
(i.e. switch places with the row above it: click on the 5th makes it 4th, and previously 4th row now becomes 5th)  

*WHEN* single click cell  
*AND* `ctrl` key WAS pressed  
*THEN* the its whole row should BE REMOVED entirely. (After all, we have to clean up after such a hard work!)  
> **[ -warning- ]**
EXCEPTION: only the content rows should be removed with the click behavior: table heading should NOT be affected.


[^DocumentFragment]: [(DocumentFragment MDN)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) frequent update operations of DOM tree are 'expensive', and for dynamically generated content this can be a performance problem.
Since the document fragment is in memory and not part of the main DOM tree, appending children to it does not cause page [reflow](https://developers.google.com/speed/articles/reflow?csw=1) (computation of element's position and geometry). Consequently, using document fragments often results in [better performance](http://ejohn.org/blog/dom-documentfragments/).

The code should work properly in latest versions of Chrome, Firefox and Edge without any transpilation.

## WORKFLOW:

Commit implemented task to git into

branch `03-javascript`

folder `03-javascript/02-browser-events-and-dom/task-03`

Structure of the task should be:

```
<task folder>
|--- index.html   
|--- js/
|    |--- multiplication-table.js
|    \--- table.js
\--- css/
     |--- custom.css
     \--- vendor/
          \--- bootstrap.min.css
```

## SOURCES:

You are provided with source files:

```
task-1
└─── README.md (-- current file)
└─── index.html   
└─── js/
│    └─── table.js
└─── css/
     └─── custom.css
     └─── vendor/
          └─── bootstrap.min.css
```

## DEADLINE:

Due Date - 15-01-2019 23:59.

Penalty will be applied for each overdue day.
