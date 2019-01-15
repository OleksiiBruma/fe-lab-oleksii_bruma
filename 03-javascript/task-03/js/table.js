window.onload = function() {
    function createTable(tableArray) {
    let tableFragment = document.createDocumentFragment();
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tfoot = document.createElement("tfoot");
    for (let row = 0 ; row <= tableArray.length-1; row++){
        var tr = document.createElement("tr");
        for (let column = 0; column <= tableArray.length-1; column++){
            if(row === 0 && column === 0){
                let thText = document.createTextNode("0");
                let th = document.createElement("th");
                th.appendChild(thText);
                tr.appendChild(th);
                thead.appendChild(tr);
            }
            else if( row === 0){
                let thText = document.createTextNode(tableArray[row][column]);
                let th = document.createElement("th");
                th.appendChild(thText);
                tr.appendChild(th);
                thead.appendChild(tr);}
        else if( column === 0) {
                let thText = document.createTextNode(tableArray[row][column]);
                let th = document.createElement("th");
                th.setAttribute("scope","row");
                th.appendChild(thText);
                tr.appendChild(th);
                tbody.appendChild(tr);}
        else{
                let tdText = document.createTextNode(tableArray[row][column]);
                let td = document.createElement("td");
                td.appendChild(tdText);
                tr.appendChild(td);
                tbody.appendChild(tr);}
        }
    }
    tableFragment.appendChild(thead);
    tableFragment.appendChild(tbody);
    tableFragment.appendChild(tfoot);
    let tablePlace = document.querySelector("table");
    while (tablePlace.firstChild) {
        tablePlace.removeChild(tablePlace.firstChild);
    }
    tablePlace.appendChild(tableFragment);
}
let createTableArray = multiplicationTable(1,3,7);
createTable(createTableArray);
}
