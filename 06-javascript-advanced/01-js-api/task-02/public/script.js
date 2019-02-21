(function () {
    'use strict';

    var ITERATIONS = 100000000;

    //Function that generates random coordinates for point(x:[-r,r), y:[-r,r))
    //and checks if it is in a circle with radius r
    var generatePoint = function () {
        var r = 16;
        var x = Math.random() * r * 2 - r;
        var y = Math.random() * r * 2 - r;
        return (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2))
    };

    //Return estimated value of Pi after all iterations
    var computePi = function () {
        var inCircle = 0;
        var i;
        for (i = 0; i < ITERATIONS; i++) {
            if (generatePoint()) {
                inCircle++;
            }
        }
        return inCircle / ITERATIONS * 4;
    };

    //Performs synchronous calculations of Pi after click on button
    document.querySelector('#syncstart').addEventListener('click', function () {
        document.querySelector('#syncresult').innerHTML = computePi();
    });
})();

function openTab(e) {
e.preventDefault();
    if (event.target.tagName.toLowerCase() === 'a') {

        const tabName = e.target.parentElement.dataset.tab;
        const tabcontent = Array.prototype.slice.call(document.querySelectorAll(".content-block"));
        const tablinks = Array.prototype.slice.call(document.querySelectorAll(".tabs__item"));

        tabcontent.forEach((tab) => tab.style.display = "none");
        tablinks.forEach((link) => link.classList.remove("tabs__item--active"));
        document.querySelector(`[data-content="${tabName}"]`).style.display = "block";
        e.target.parentElement.classList.add("tabs__item--active");
    }
}

const nav = document.querySelector("nav");
nav.addEventListener("click", openTab);
document.querySelector(`[data-tab="default"] a`).click();



