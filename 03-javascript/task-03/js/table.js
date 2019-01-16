window.onload = function () {
  function createTable(tableArray) {
    let tableFragment = document.createDocumentFragment();
    let tablePlace = document.querySelector("table");
    while (tablePlace.firstChild) {
      tablePlace.removeChild(tablePlace.firstChild);
    }
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tfoot = document.createElement("tfoot");
    for (let row = 0; row <= tableArray.length - 1; row++) {
      var tr = document.createElement("tr");
      for (let column = 0; column <= tableArray.length - 1; column++) {
        if (row === 0 && column === 0) {
          let thText = document.createTextNode("");
          let th = document.createElement("th");
          th.appendChild(thText);
          tr.appendChild(th);
          thead.appendChild(tr);
        } else if (row === 0) {
          let thText = document.createTextNode(tableArray[row][column]);
          let th = document.createElement("th");
          th.appendChild(thText);
          tr.appendChild(th);
          thead.appendChild(tr);
        } else if (column === 0) {
          let thText = document.createTextNode(tableArray[row][column]);
          let th = document.createElement("th");
          th.setAttribute("scope", "row");
          th.appendChild(thText);
          tr.appendChild(th);
          tbody.appendChild(tr);
        } else {
          let tdText = document.createTextNode(tableArray[row][column]);
          let td = document.createElement("td");
          td.appendChild(tdText);
          tr.appendChild(td);
          tbody.appendChild(tr);
        }
      }
    }
    tableFragment.appendChild(thead);
    tableFragment.appendChild(tbody);
    tableFragment.appendChild(tfoot);
    tablePlace.appendChild(tableFragment);
  }
  var currentColStart = 2;
  var currentRowStart = 2;
  var currentSize = 4;
  createTable(multiplicationTable(currentColStart, currentRowStart, currentSize));
  let form = document.querySelector(".config-group");
let thead = document.querySelector("thead");
  function getInput(e) {
    if (e.target.classList.contains("js-config-output-cols")) {
      currentColStart = +e.target.value;
    }
    if (e.target.classList.contains("js-config-output-rows")) {
      currentRowStart = +e.target.value;
    }
    if (e.target.classList.contains("js-config-output-size")) {
      currentSize = +e.target.value;
    }
  }

  function makeSubmit(e) {
    if (e.type === "submit") {
      e.preventDefault();
      createTable(multiplicationTable(currentColStart, currentRowStart, currentSize));
    }
  }

  form.addEventListener("input", getInput);
  form.addEventListener("submit", makeSubmit);

function highLightCells(e){
  if(e.target.tagName === "TD"){
 e.target.classList.toggle("highlight");
 e.target.parentNode.firstChild.classList.toggle("highlight");
  let index = Array.prototype.slice.call(e.target.parentElement.children).indexOf(e.target);
  thead.firstChild.childNodes[index].classList.toggle("highlight");
}}
function changeDeleteRows(e){
    let row = e.target.parentNode;
    console.log(row);
  row.parentNode.insertBefore(row, row.previousSibling);
  if (e.target.tagName === "TD" && e.ctrlKey === true){
   let children = Array.prototype.slice.call(e.target.parentNode.children);
   children.forEach(function(child){
     if(child.tagName === "TH"){
       return
     }
     child.remove();
   });
  }
}
  let tableHTML = document.getElementsByTagName("table")[0];
  tableHTML.addEventListener("mouseover", highLightCells);
  tableHTML.addEventListener("mouseout", highLightCells);
  tableHTML.addEventListener("click", changeDeleteRows);
}