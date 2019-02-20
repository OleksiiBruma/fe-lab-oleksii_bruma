/* JavaScript here */
let permision = true;
const dropzone = document.querySelector(".dropzone");
const progressBar = document.querySelector(".progress__bar");
const startPauseButton = document.querySelector(".start-pause");
const results = document.querySelector(".results-block");
dropzone.ondragover = function (e) {
    e.preventDefault();
    this.className = "dropzone dragover"
};
dropzone.ondrop = function (e) {
    e.preventDefault();
    this.className = "dropzone dragdrop";
    const files = e.dataTransfer.files;
    const arrayOfFiles = Object.keys(files);
    const cssFiles = arrayOfFiles.filter(file => files[file].type.match(/css/));
    while (dropzone.firstChild) {
        dropzone.removeChild(dropzone.firstChild);
    }
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    if(cssFiles.length > 0){
        const reader = new FileReader();
        reader.readAsText(files[cssFiles[0]]);
        reader.onload = () => {
            const regForColors = /#(?:[a-f\d]{3}){1,2}\b|rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)|hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)|(?:rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})|hsla\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2},)\s*0*(?:1|0(?:\.\d+)?)\s*\)/ig;
            const regForUnits = /(\s0(px|pt|em|rem|vh|vw))/g;
            const UniqueColors = Array.from(new Set(reader.result.match(regForColors)));
            const UnnededUnits =Array.from(new Set(reader.result.match(regForUnits)));
            let colors = "";
            let units = "";
            UniqueColors.forEach(color=> {colors +=`<pre>${color}</pre>`});
            UnnededUnits.forEach(unit=> {units +=`<pre>${unit}</pre>`});
            let result = `<h2>Colors</h2>${colors}<h2>Units</h2>${units}`;
            results.insertAdjacentHTML("afterbegin",result);
    }}
    else {

    for (let key in files) {
        if (key === "length") {
            break
        }
        if (files[key].type.match(/image/)) {
            const reader = new FileReader();
            reader.readAsDataURL(files[key]);
            reader.onload = () => {
                let result =
                    `<div class="preview__card">
<img class="preview__image" src="${reader.result}">
<div class="preview__description">
<p class="preview__filename">File name: ${files[key].name}</p>
<p class="preview__size">Size ${files[key].size}KB</p>
</div></div>`;
                dropzone.insertAdjacentHTML("afterbegin", result);
            };
        }
    }}
    const sliceSize = 1024;
    const maxSize = getMaxSize(files);
    const progressValue = getProgressValue(sliceSize, maxSize);
    let currentProgressValue = 0;
    let lastChunk = false;

    async function processArray(files) {

        for (const file of files) {
            if (file.type.match(/image/)){
                await uploadFile(file);
            }
        }
    }
    processArray(files);


    function uploadFile(fl) {
        startPauseButton.addEventListener("click", toggleUploading);
        function toggleUploading(e){
            e.preventDefault();
            if(permision){
                permision = false
            }
            else permision = true;
            loop(start);
        }
        const file = fl;
        let start = 0;
        const name = file.name;
        const size = file.size;
        loop(start);

        function loop(start) {
            lastChunk = false;

            let end = start + sliceSize;
            if (size - end < 0) {
                end = size;
                lastChunk = true;

            }
            let s = slice(file, start, end);
            send(s, start, end, name, lastChunk)
                .then(
                    response => {
                        currentProgressValue += progressValue;
                        updateProgressBar(currentProgressValue);
                        loop(response);}
                );
        }

        function send(piece, start, end, name, lastChunk) {
            return new Promise(function (resolve, reject) {
                var formdata = new FormData();
                var xhr = new XMLHttpRequest();
                xhr.open('POST', ENDPOINT_URL, true);
                formdata.append('name', name);
                formdata.append('start', start);
                formdata.append('lastChunk', lastChunk);
                formdata.append('chunk', piece);
                if(permision){
                xhr.send(formdata)}
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (!lastChunk) {
                            start = JSON.parse(xhr.responseText).expectedStart;
                            resolve(start);
                        }
                        else {imageUrl = JSON.parse(xhr.responseText).fileUrl;

                            renderResults(imageUrl)
                        }

                    }
                }
            })
        }

        /**
         * Formalize file.slice
         */
        function renderResults(url){
            let image = `<a href="/${url}" target="_blank"><image class="preview__image" src="/${url}"></a>`;
            results.insertAdjacentHTML("afterbegin", image)

        }

        function slice(file, start, end) {
            var slice = file.mozSlice ? file.mozSlice :
                file.webkitSlice ? file.webkitSlice :
                    file.slice ? file.slice : noop;

            return slice.bind(file)(start, end);
        }

        function noop() {

        }

    }
};

function getMaxSize(files) {
    let maxSize = 0;
    for (let key in files) {
        if (key === "length") {
            break
        }
        maxSize += files[key].size;

    }
    return maxSize
}

function getProgressValue(sliceSize, maxSize) {
    return Math.round(sliceSize * 100 / maxSize);
}

function updateProgressBar(value) {
    if (value < 90) {
        progressBar.style.width = `${value}%`;
    } else progressBar.style.width = `100%`;
}

dropzone.ondragleave = function (e) {
    e.preventDefault();
    this.className = "dropzone"
};


