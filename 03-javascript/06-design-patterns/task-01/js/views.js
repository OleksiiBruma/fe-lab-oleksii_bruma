var listController = require("./controllers.js").listController;
var likeController = require("./controllers.js").likeController;
var modalController = require("./controllers.js").modalController;


class ListView {
    constructor() {
    }

    render(data) {
        var fragment = document.createDocumentFragment();
        data.forEach(function (canvas) {
            let canvasItem = document.createElement("div");
            canvasItem.classList.add("canvas__item");
            canvasItem.setAttribute("data-id", canvas.id);
            let canvasLink = document.createElement("a");
            canvasLink.classList.add("canvas__link");
            canvasLink.setAttribute("href", "#")
            let canvasImage = document.createElement("img");
            canvasImage.classList.add("canvas__image");
            canvasImage.setAttribute("src", canvas.image);
            let canvasLike = document.createElement("button");
            canvasLike.classList.add("canvas__like");
            let canvasLikeAmount = document.createElement("span");
            canvasLikeAmount.classList.add("canvas__likes-amount");
            canvasLikeAmount.textContent = "(" + canvas.likeAmount +
                " likes)";
            canvasLink.appendChild(canvasImage);
            canvasItem.appendChild(canvasLink);
            canvasItem.appendChild(canvasLike);
            canvasItem.appendChild(canvasLikeAmount);
            fragment.appendChild(canvasItem);
        });
        let photoGallery = document.querySelector(".photo-gallery");
        photoGallery.appendChild(fragment);
    }

}

class LikeView {
    constructor() {
    }

    reRender(e, index, model) {
        let likeAmount = model[index].likeAmount;
        let id = e.target.parentElement.getAttribute("data-id");
        var likeNodes = document.querySelectorAll(`*[data-id]`);

        var like = Array.from(likeNodes);
        like.forEach(function (dataId) {
            if (dataId.getAttribute("data-id") === id) {
                dataId.querySelector(".canvas__likes-amount").textContent = "(" + likeAmount + " likes)";
            }
        })
    }
}

class ModalView {
    constructor() {
    }

    render(canvas) {
        let fragment = document.createDocumentFragment();
        let imageDialog = document.createElement("div");
        imageDialog.classList.add("modal");
        imageDialog.classList.add("hidden");
        let modalContent = document.createElement("div");
        modalContent.classList.add("modal__content");
        let close = document.createElement("span");
        close.classList.add("close");
        close.innerHTML = "&times;";
        let canvasLink = document.createElement("a");
        canvasLink.classList.add("canvas__link");
        canvasLink.setAttribute("href", "#")
        let canvasImage = document.createElement("img");
        canvasImage.classList.add("canvas__image");
        canvasImage.setAttribute("src", "#");
        let canvasLike = document.createElement("button");
        canvasLike.classList.add("canvas__like");
        let canvasLikeAmount = document.createElement("span");
        canvasLikeAmount.classList.add("canvas__likes-amount");
        let buttons = document.createElement("div");
        buttons.classList.add("buttons");
        let canvasPrev = document.createElement("button");
        canvasPrev.classList.add("canvas__prev");
        canvasPrev.textContent = "prev";
        let canvasNext = document.createElement("button");
        canvasNext.classList.add("canvas__next");
        canvasNext.textContent = "next";
        modalContent.appendChild(close);
        canvasLink.appendChild(canvasImage);
        modalContent.appendChild(canvasLink);
        modalContent.appendChild(canvasLike);
        modalContent.appendChild(canvasLikeAmount);
        buttons.appendChild(canvasPrev);
        buttons.appendChild(canvasNext);
        modalContent.appendChild(buttons);
        imageDialog.appendChild(modalContent)
        fragment.appendChild(imageDialog);
        let photoGallery = document.querySelector(".photo-gallery");
        photoGallery.appendChild(fragment);
    }

    hideModal(e) {
        e.target.parentElement.parentElement.classList.add("hidden");
    }

    showModal(e, i, model) {
        let modal = document.querySelector(".modal")
        let modalContent = document.querySelector(".modal__content")
        modalContent.setAttribute("data-id", model[i].id)
        modal.setAttribute("data-id",
            model[i].id)
        modal.classList.remove("hidden");
        let image = modal.querySelector(".canvas__image");
        let like = modal.querySelector(".canvas__likes-amount");
        image.setAttribute("src", model[i].image);
        like.textContent = "(" + model[i].likeAmount + " likes)";
    }

    nextModal(model) {
        let modal = document.querySelector(".modal")
        let modalContent = document.querySelector(".modal__content");
        let index = +modalContent.getAttribute("data-id");
        if (index === model.length - 1) {
            index = 0;
        }
        modalContent.setAttribute("data-id", model[index + 1].id)
        modal.setAttribute("data-id",
            model[index + 1].id)
        modal.classList.remove("hidden");
        let image = modal.querySelector(".canvas__image");
        let like = modal.querySelector(".canvas__likes-amount");
        image.setAttribute("src", model[index + 1].image);
        like.textContent = "(" + model[index + 1].likeAmount + " likes)";
    }

    prevModal(model) {
        let modal = document.querySelector(".modal")
        let modalContent = document.querySelector(".modal__content");
        let index = +modalContent.getAttribute("data-id");
        if (index === 0) {
            index = model.length;
        }
        modalContent.setAttribute("data-id", model[index - 1].id)
        modal.setAttribute("data-id",
            model[index - 1].id)
        modal.classList.remove("hidden");
        let image = modal.querySelector(".canvas__image");
        let like = modal.querySelector(".canvas__likes-amount");
        image.setAttribute("src", model[index - 1].image);
        like.textContent = "(" + model[index - 1].likeAmount + " likes)";
    }
}

module.exports.ModalView = ModalView;
module.exports.ListView = ListView;
module.exports.LikeView = LikeView;

