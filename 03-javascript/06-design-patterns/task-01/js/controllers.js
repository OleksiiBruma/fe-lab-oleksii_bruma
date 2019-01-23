var model = require("./models.js").model;
var ListView = require("./views.js").ListView;
var LikeView = require("./views.js").LikeView;
var ModalView = require("./views.js").ModalView;

class ListController {
    constructor(model) {
        this.model = model;
        this.listView = new ListView(model);
    }

    render() {
        this.listView.render(model)
    };

    getModel() {
        return this.model;
    }

    test() {
        console.log("test");
    }
}

class LikeController {
    constructor(model) {
        this.model = model;
        this.likeView = new LikeView(model);
    }

    reRender(e, i, model) {
        this.likeView.reRender(e, i, model)
    }

}

class ModalController {
    constructor(model) {
        this.model = model;
        this.modalView = new ModalView(model);
    }

    render() {
        this.modalView.render(model);
    }
}

const modalController = new ModalController(model);
module.exports.modalController = modalController;
const listController = new ListController(model);
listController.render()
module.exports.listController = listController;
const likeController = new LikeController(model);
module.exports.likeController = likeController;
modalController.render();

function checkClick(e) {
    if (e.target.classList.contains("canvas__like")) {
        const id = e.target.parentElement.getAttribute("data-id");
        for (let i = 0; i < model.length; i++) {
            if (model[i].id === +id) {
                listController.getModel()[i].like.likeUp();
                listController.getModel()[i].update();
                likeController.reRender(e, i, model);
                return
            }
        }
    }
    if (e.target.classList.contains("close")) {
        modalController.modalView.hideModal(e)
    }
    if (e.target.classList.contains("canvas__image")) {
        e.preventDefault();

        const id = e.target.parentElement.parentElement.getAttribute("data-id");
        for (let i = 0; i < model.length; i++) {
            if (model[i].id === +id) {
                modalController.modalView.showModal(e, i, model);
                return
            }
        }
    }
    if (e.target.classList.contains("canvas__next")) {
        modalController.modalView.nextModal(model);
    }
    if (e.target.classList.contains("canvas__prev")) {
        modalController.modalView.prevModal(model);
    }
}


document.addEventListener("click", checkClick);


