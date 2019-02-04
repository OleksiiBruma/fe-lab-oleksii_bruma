require('./task_collection.less');
import template from "./task_collection.handlebars";
import globalListTemplate from "./task_collection_globalList.handlebars"
export class Task_collection_view {
  constructor(){
    this.task_collectionTemplate = template();
    this.globalListTemplate = globalListTemplate;
  }
  init(){
    if(sessionStorage.length === 0) {
      document.querySelector("body").insertAdjacentHTML("beforeend", this.task_collectionTemplate);
      sessionStorage.setItem('newUser', 'false');
      this.firstVisit();
      return
    }
    document.querySelector("body").insertAdjacentHTML("beforeend", this.task_collectionTemplate);
  }
  firstVisit(){
    document.querySelector(".stub--first-visit").classList.remove("hidden");
    document.querySelector(".daily").classList.add("hidden");
    document.querySelector(".global").classList.add("hidden");
  }
  toggleGlobalList(){
    document.querySelector(".open-button__icon").classList.toggle("open-button__icon--active");
    document.querySelector(".global__filter").classList.toggle("global__filter--active");
    document.querySelector(".global__tasks").classList.toggle("global__tasks--active");
  }
  globalListRender(categories){
    document.querySelector(".global__tasks").innerHTML = this.globalListTemplate(categories);
  }
}
