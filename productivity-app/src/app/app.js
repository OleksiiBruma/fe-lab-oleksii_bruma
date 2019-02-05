import {task_controller} from "./components/task/task_controller";

require('assets/less/main.less');
import {EventBus} from "./eventBus";
import {Router} from "./router.js"

Router.config({mode: 'history'});

Router
  .add(/settings/, function () {
    EventBus.emit('goToSettings');
  })
  .add(/timer/, function () {
    EventBus.emit('goToTimer');
  })
  .add(/reports/, function () {
    EventBus.emit('goToReports');
  })
  .add(function () {
    Router.navigate('');
    EventBus.emit('goToTaskList');
  })
  .check().listen();

class Global_controller {
  constructor() {
  }

  addEventListeners() {

    function chooseTarget(e) {
      if (e.target.classList.contains("menu__link--icon-list")) {
        event.preventDefault();
        EventBus.emit('goToTaskList');
      }
      if (e.target.classList.contains("menu__link--icon-statistics")) {
        event.preventDefault();
        EventBus.emit('goToReports');
      }
      if (e.target.classList.contains("menu__link--icon-settings")) {
        e.preventDefault();
        EventBus.emit('goToSettings');
      }
      if (e.target.classList.contains("task__indicator")) {
        event.preventDefault();
        EventBus.emit('goToTimer');
      }
      if (e.target.classList.contains("page__add-button")) {
        EventBus.emit('addNewTask');
      }
      if (e.target.classList.contains("modal__close")) {
        EventBus.emit('closeModal');
      }
      if (e.target.classList.contains("modal__submit")) {
        EventBus.emit("submitNewTask");
      }
      if (e.target.classList.contains("global__button")||
        e.target.classList.contains("open-button__icon") ) {
        EventBus.emit("toggleGlobalList");
      }
      if (e.target.classList.contains("task__shift")){
        EventBus.emit("globalToDaily",e.target.parentElement.parentElement.dataset.id);
      }
      if (e.target.hasAttribute("data-filter")){
        e.preventDefault()
        EventBus.emit("setFilterStatus",["filterState", e.target.dataset.filter])
      }
      if (e.target.hasAttribute("data-todoView")){
        e.preventDefault()
        EventBus.emit("setFilterStatus",["todoView", e.target.dataset.todoview])
      }

    }

    document.body.addEventListener("click", chooseTarget)
  }
}

const global_controller = new Global_controller();
global_controller.addEventListeners();




