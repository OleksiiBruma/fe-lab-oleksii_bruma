/* JavaScript here */
let permision = true;
const dropzone = document.querySelector(".dropzone");
const progressBar = document.querySelector(".progress__bar");
const startPauseButton = document.querySelector(".start-pause");

dropzone.ondragover = function (e) {
    e.preventDefault();
    this.className = "dropzone dragover"
};
dropzone.ondrop = function (e) {
    e.preventDefault();
    this.className = "dropzone dragdrop";
    const files = e.dataTransfer.files;

    for (let key in files) {
        if (key === "length") {
            break
        }
        if (files[key].type.match(/image/)) {
            while (dropzone.firstChild) {
                dropzone.removeChild(dropzone.firstChild);
            }
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
    }
    const sliceSize = 1024;
    const maxSize = getMaxSize(files);
    const progressValue = getProgressValue(sliceSize, maxSize);
    let currentProgressValue = 0;
    let lastChunk = false;

    async function processArray(files) {

        for (const file of files) {
            console.log(file);
            await uploadFile(file);
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

                    }
                }
            })
        }

        /**
         * Formalize file.slice
         */

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


