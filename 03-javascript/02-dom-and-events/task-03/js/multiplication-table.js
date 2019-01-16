function multiplicationTable(colStart, rowStart, size) {
    arguments = Array.prototype.slice.call(arguments);
    arguments.forEach(function (argument) {
        if (typeof argument !== "number" || argument <= 0) {
            throw "Function requires three integer arguments that are greater or equalt than 1";
        }
    });
    const table = new Array(size + 1);
    for (i = 0; i < size + 1; i++) {
        table[i] = new Array(size + 1);
    }
    for (var i = 1; i < size + 1; i++) {
        table[i][0] = rowStart++;
        table[0][i] = colStart++;
    }
    for (var i = 1; i < size + 1; i++) {
        for (var j = 1; j < size + 1; j++) {
            table[i][j] = table[i][0] * table[0][j];
        }
    }
    table[0][0] = null;
    return table;
}
