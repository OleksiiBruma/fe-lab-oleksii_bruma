const body = document.querySelector("body");

function deleteFile(e) {
    if (e.target.classList.contains("button--delete")) {
        const deleteButton = e.target;
        const link = deleteButton.dataset.id;
        return fetch(link, {method: 'DELETE'})
            .then(res => {
                e.target.parentElement.remove();
                return res
            }).catch(err => console.error(err))
    }
}

body.addEventListener('click', deleteFile);