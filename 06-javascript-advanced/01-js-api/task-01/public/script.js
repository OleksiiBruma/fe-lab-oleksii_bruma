/* JavaScript here */

const dropzone = document.querySelector(".dropzone");

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
    processFile(e)
};
dropzone.ondragleave = function (e) {
    e.preventDefault();
    this.className = "dropzone"
};


function processFile(e) {
    const files = e.dataTransfer.files;
    for (let key in files) {
        if (key === "length") {
            break
        }
        const file = files[key];
        let start = 0;
        const name = file.name;
        const size = file.size;
        const sliceSize = CHUNK_SIZE;
        let lastChunk = false;
        loop(start);

        function loop(start) {

            let end = start + sliceSize;
            if (size - end < 0) {
                end = size;
                lastChunk = true;
            }
            let s = slice(file, start, end);
            send(s, start, end, name, lastChunk);
        }

        function send(piece, start, end, name, lastChunk) {
            var formdata = new FormData();
            var xhr = new XMLHttpRequest();
            xhr.open('POST', ENDPOINT_URL, true);
            formdata.append('name', name);
            formdata.append('start', start);
            formdata.append('lastChunk', lastChunk);
            formdata.append('chunk', piece);
            xhr.send(formdata);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (!lastChunk) {
                        start = JSON.parse(xhr.responseText).expectedStart;
                        setTimeout( ()=>loop(start),3 );
                    }

                }
            }
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
}