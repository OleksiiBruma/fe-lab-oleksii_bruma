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
const Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function (options) {
        this.mode = options && options.mode && options.mode == 'history'
        && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function () {
        var fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes: function (path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function (re, handler) {
        if (typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({re: re, handler: handler});
        return this;
    },
    check: function (f) {
        var fragment = f || this.getFragment();
        for (var i = 0; i < this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    },
    listen: function () {
        var self = this;
        var current = self.getFragment();
        var fn = function () {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function (path) {
        path = path ? path : '';
        if (this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
};
Router.config({mode: 'history'});
Router
    .add(/geolocation/, function () {
        openTab("geolocation");

    })
    .add(/synccalculation/, function () {
        openTab("synccalculation");

    })
    .add(/webworker/, function () {
        openTab("webworker");


    })
    .add(function () {
        history.replaceState(null, null, "/");
        openTab("default");
    })
    .check().listen();


const nav = document.querySelector("nav");
const content = document.querySelector(".content");
nav.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() === "a") {
        const path = e.target.parentElement.dataset.tab;
        Router.navigate(`/${path}/`);
    }

});
if (document.fullscreenEnabled) {
    const tabcontent = Array.prototype.slice.call(document.querySelectorAll(".content__block"));
    const button = `<button class="toggle-fullscreen">+</button>`;
    tabcontent.forEach(content => content.insertAdjacentHTML("beforeend", button))
}

content.addEventListener("click", function (e) {
    console.log(e);
    if (e.target.classList.contains("toggle-fullscreen")) {
        let button = e.target;
        let block = button.parentElement;
        toggleFullScreen(button, block);
    }
}, false);

function openTab(nameTab) {
    const tab = document.querySelector(`[data-tab="${nameTab}"]`);
    const tabcontent = Array.prototype.slice.call(document.querySelectorAll(".content__block"));
    const tablinks = Array.prototype.slice.call(document.querySelectorAll(".tabs__item"));
    tabcontent.forEach((tab) => tab.style.display = "none");
    tablinks.forEach((link) => link.classList.remove("tabs__item--active"));
    document.querySelector(`[data-content="${nameTab}"]`).style.display = "block";
    tab.classList.add("tabs__item--active");
}

function toggleHeading(block) {
    block.firstElementChild.classList.toggle("hidden");
}


function toggleFullScreen(button, block) {

    if (!document.fullscreenElement) {
        block.requestFullscreen();
        button.innerText = "-";
        toggleHeading(block);
    } else {
        if (document.exitFullscreen) {
            button.innerText = "+";
            document.exitFullscreen();
            toggleHeading(block)
        } else if (document.webkitExitFullscreen) {
            button.innerText = "+";
            document.webkitExitFullscreen();
            toggleHeading(block)
        } else if (document.mozCancelFullScreen) {
            button.innerText = "+";
            document.mozCancelFullScreen();
            toggleHeading(block)
        } else if (document.msExitFullscreen) {
            button.innerText = "+";
            document.msExitFullscreen();
            toggleHeading(block)
        } else {
            console.log('Fullscreen API is not supported.');
        }
    }
}


