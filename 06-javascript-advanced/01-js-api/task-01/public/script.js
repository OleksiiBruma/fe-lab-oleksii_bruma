/* JavaScript here */
const dropzone = document.querySelector(".dropzone");
dropzone.ondragover = function(e){
    e.preventDefault();
    this.className = "dropzone dragover"
};
dropzone.ondrop = function(e){
    e.preventDefault();
    this.className = "dropzone dragdrop"
};
dropzone.ondragleave = function(e){
    e.preventDefault();
    this.className = "dropzone"
};

