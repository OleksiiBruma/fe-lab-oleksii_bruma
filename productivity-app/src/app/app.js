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
    history.replaceState(null, null, "");
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
        Router.navigate('');
      }
      if (e.target.classList.contains("menu__link--icon-statistics")) {
        event.preventDefault();
        Router.navigate('/reports/');
      }
      if (e.target.classList.contains("menu__link--icon-settings")) {
        e.preventDefault();
        Router.navigate('/settings/');
      }
      if (e.target.classList.contains("task__indicator")) {
        event.preventDefault();
        Router.navigate('/timer/');
      }
      if (e.target.classList.contains("page__add-button")) {
        EventBus.emit('addNewTask');
      }
      if (e.target.classList.contains("modal__close")) {
        EventBus.emit('closeModal');
      }
      if (e.target.classList.contains("modal__submit--add")) {
        e.preventDefault();
        EventBus.emit("submitNewTask");
      }
      if (e.target.classList.contains("modal__submit--edit")) {
        e.preventDefault();
        EventBus.emit("submitEditedTask");
      }
      if (e.target.classList.contains("global__button") ||
        e.target.classList.contains("open-button__icon")) {
        EventBus.emit("toggleGlobalList");
      }
      if (e.target.classList.contains("task__shift")) {
        EventBus.emit("globalToDaily", e.target.parentElement.parentElement.dataset.id);
      }
      if (e.target.hasAttribute("data-filter")) {
        e.preventDefault();
        EventBus.emit("setFilterStatus", ["filterState", e.target.dataset.filter])
      }
      if (e.target.hasAttribute("data-todoView")) {
        e.preventDefault();
        EventBus.emit("setFilterStatus", ["todoView", !!e.target.dataset.todoview])
      }
      if (e.target.classList.contains("task__edit")) {
        EventBus.emit("openEditModal", e.target.parentElement.parentElement.dataset.id)
      }
      if (e.target.classList.contains("modal__submit--edit")) {
        EventBus.emit("submitEdit")
      }
      if (e.target.classList.contains("menu__link--icon-trash")) {
        e.preventDefault()
        EventBus.emit("RemoveMode")
      }
      if (e.target.classList.contains("task__delete")) {
        EventBus.emit("toggleSelectedTask",e.target.parentElement.parentElement)
      }
      if (e.target.classList.contains("select")) {
        e.preventDefault();
        EventBus.emit("selectAll",e.target)
      }
      if (e.target.classList.contains("deselect")) {
        e.preventDefault();
        EventBus.emit("deselectAll",e.target)
      }
      if (e.target.classList.contains("button--close")) {
        EventBus.emit("closeRemoveModal")
      }
      if (e.target.classList.contains("button--remove")) {
        EventBus.emit("submitDeleteTask")
      }
    }

    document.body.addEventListener("click", chooseTarget)
  }
}

const global_controller = new Global_controller();
global_controller.addEventListeners();




