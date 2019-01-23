var model =  require ("./models.js").model;
var ListView = require ( "./views.js").ListView;
var LikeView = require  ("./views.js").LikeView;

class ListController {
    constructor(model) {
        this.model = model;
        this.listView= new ListView(model);
    }
   render() {
      this.listView.render(model)
    };
    getModel() {
        return this.model;
    }
}
class LikeController {
    constructor(model) {
        this.model = model;
        this.likeView = new LikeView(model);
    }
    reRender (e,i,model){
        this.likeView.reRender(e,i,model)
    }

}




const listController = new ListController(model);
listController.render();
//console.log(listController.getModel());
module.exports.listController = listController;
const likeController = new LikeController(model);
module.exports.likeController = likeController;

function checkClick(e){
    if(e.target.classList.contains("canvas__like")){
        const id = e.target.parentElement.getAttribute("data-id");


        for (let i=0; i<model.length; i++){
            if ( model[i].id === +id ){
                listController.getModel()[i].like.likeUp();
                listController.getModel()[i].update();
                likeController.reRender(e,i,model);
                return
            }

        }
    }
}

document.addEventListener("click",checkClick);