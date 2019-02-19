/* JavaScript here */
const dropzone = document.querySelector(".dropzone");

function upload(files) {
    let fromData = new FormData(),
        xhr = new XMLHttpRequest(),
        x;

}

dropzone.ondragover = function (e) {
    e.preventDefault();
    this.className = "dropzone dragover"
};
dropzone.ondrop = function (e) {
    e.preventDefault();
    this.className = "dropzone dragdrop";
    //for()
    const files = e.dataTransfer.files;

    for (let key in files) {
        if (key === "length") {
            return
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
};
dropzone.ondragleave = function (e) {
    e.preventDefault();
    this.className = "dropzone"
};

