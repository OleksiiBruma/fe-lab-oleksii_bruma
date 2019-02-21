const MAPLABELLIMIT = 10;
const ITERATIONS = 100000000;
const RESULTSEVERY = 1000000;
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
        openTab((window.location.pathname).slice(1));

    })
    .add(/synccalculation/, function () {
        openTab((window.location.pathname).slice(1));
    })
    .add(/webworker/, function () {
        openTab((window.location.pathname).slice(1));
    })
    .add(function () {
        history.replaceState(null, null, "/");
        openTab("default");
    })
    .check().listen();


function checkUrl() {
    if ((window.location.pathname).slice(1) === "geolocation") {
        startWatching();
    } else {
        stopWatching();
        mapLabel = 0;
    }

}

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
    checkUrl();
    tabcontent.forEach((tab) => tab.classList.add("hidden"));
    tablinks.forEach((link) => link.classList.remove("tabs__item--active"));
    document.querySelector(`[data-content="${nameTab}"]`).classList.remove("hidden");
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
var mapLabel = 0;
var watchID;


function startWatching() {
    watchID = navigator.geolocation.watchPosition(function (position) {
        if (mapLabel < MAPLABELLIMIT) {
            mapLabel++;
            //const mapSrc= getStaticMapSrc(position);
            //renderMap(mapSrc);
        } else {
            stopWatching();
        }
    });
}

function stopWatching() {
    navigator.geolocation.clearWatch(watchID);
}
/*
function getStaticMapSrc(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const src = `https://maps.googleapis.com/maps/api/staticmap?size=${Math.round(window.innerWidth / 2)}x${Math.round(window.innerHeight / 2)}&scale=2&markers=label:${mapLabel}%7C${lat},${long}&key=AIzaSyCFwZS-kFutyICG5O2mB-qSAqjWY9Xhzgs`;
    return src
}

function renderMap(src) {
    document.querySelector(`[data-content="geolocation"] img`).src = src;
}*/

const worker = new Worker("worker.js");


function makeRequest (e){
    const iterations = document.querySelector('#iterations').value || ITERATIONS;
    const resultsEvery = document.querySelector('#results-every').value || RESULTSEVERY;
    worker.postMessage({iterations:iterations,resultsEvery:resultsEvery});
}


//Performs synchronous calculations of Pi after click on button
document.querySelector('#submit-data').addEventListener('click', makeRequest);