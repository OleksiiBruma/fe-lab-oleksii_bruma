var listController = require("./controllers.js").listController;
var likeController =  require("./controllers.js").likeController;



 class ListView {
    constructor(data) {
        this.data = data;
    }

    render(data) {
        let fragment = "";
        data.forEach(function (canvas) {
            fragment +=
                `<div class="canvas__item" data-id="${canvas.id}">
        <a href="#" class="canvas__link"><img class="canvas__image" src=${canvas.image} alt=""></a>
        <button class="canvas__like "></button>
        <span class="canvas__likes-amount">(${canvas.likeAmount} likes)</span>
    </div>`
        });
        document.querySelector(".photo-gallery").innerHTML = fragment;
    }

}

 class LikeView {
    constructor(data) {
        this.data = data;
    }

reRender(e, index, data2) {
        let likeAmount = data2[index].likeAmount;
        console.log (data2[index].likeAmount)
  e.target.nextElementSibling.innerHTML ="(" + likeAmount + " likes)";
}

}
//console.log(listController.getModel());
//const listView = new ListView();
//const likeView = new LikeView();
 module.exports.ListView = ListView;
module.exports.LikeView = LikeView;

