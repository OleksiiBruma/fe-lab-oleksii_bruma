import {Router} from "../router";
import {EventBus} from "../eventBus";

export class Global_view {
  constructor() {
  }

  addEventListeners() {

    function chooseTarget(e) {
      if (e.target.matches(`[data-id="tasklist"]`)) {
        e.preventDefault();
        Router.navigate('');
      }
      if (e.target.matches(`[data-id="reports"]`)) {
        e.preventDefault();
        Router.navigate('/reports/');
      }
      if (e.target.matches(`[data-id="settings"]`)) {
        e.preventDefault();
        Router.navigate('/settings\/pomodoros/');
      }
      if (e.target.matches(`[data-id="tasklistfirsttime"]`)) {
        e.preventDefault();
        EventBus.emit('goToTaskList');
      }
      if (e.target.classList.contains("task__indicator")) {
        e.preventDefault();
        if(e.target.parentElement.parentElement.classList.contains("daily__tasks-list")){
          Router.navigate('/timer/');
          return
        }
        console.log("Please drag the task to the daily list");
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
      if (e.target.matches(`[data-id="globalbutton"]`)) {
        EventBus.emit("toggleGlobalList");
      }
      if (e.target.classList.contains("task__shift")) {
        EventBus.emit("globalToDaily", e.target.parentElement.parentElement.dataset.id);
      }
      if (e.target.hasAttribute("data-filterState")) {
        e.preventDefault();
        EventBus.emit("setFilterStatus", ["filterState", e.target.dataset.filterstate])
      }
      if (e.target.hasAttribute("data-todoView")) {
        e.preventDefault();
        EventBus.emit("setFilterStatus", ["todoView", e.target.dataset.todoview])
      }
      if (e.target.classList.contains("task__edit")) {
        EventBus.emit("openEditModal", e.target.parentElement.parentElement.dataset.id)
      }
      if (e.target.classList.contains("modal__submit--edit")) {
        EventBus.emit("submitEdit");
      }
      if (e.target.matches(`[data-id="trash"]`)) {
        e.preventDefault();
        EventBus.emit("RemoveMode");
      }
      if (e.target.classList.contains("task__delete")) {
        EventBus.emit("toggleSelectedTask", e.target.parentElement.parentElement)
      }
      if (e.target.classList.contains("select")) {
        e.preventDefault();
        EventBus.emit("selectAll", e.target)
      }
      if (e.target.classList.contains("deselect")) {
        e.preventDefault();
        EventBus.emit("deselectAll", e.target)
      }
      if (e.target.classList.contains("button--close")) {
        EventBus.emit("closeRemoveModal")
      }
      if (e.target.classList.contains("button--remove")) {
        EventBus.emit("submitDeleteTask")
      }
      if (e.target.matches(`[data-id="pomodoros"]`)) {
        e.preventDefault();
        Router.navigate('/settings\/pomodoros/');
      }
      if (e.target.matches(`[data-id="category"]`)) {
        e.preventDefault();
        Router.navigate('/settings\/categories/');
      }
      if (e.target.matches(`[data-id="saveNewSettings"]`)) {
        EventBus.emit("writeNewSettings");
        Router.navigate('todoList');
      }
    }

    document.body.addEventListener("click", chooseTarget)
  }
}
