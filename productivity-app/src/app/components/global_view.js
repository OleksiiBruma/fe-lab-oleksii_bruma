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
       if(e.target.parentElement.classList.contains("task--done")){
         console.log("The task has already done");
         return
       }
        else if(e.target.parentElement.parentElement.classList.contains("daily__tasks-list")){
          EventBus.emit('writeActiveState',e.target.parentElement.dataset.id);
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
        EventBus.emit("globalToDaily", [e.target.parentElement.parentElement.dataset.id,"DAILY_LIST"]);
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
        e.preventDefault();
        EventBus.emit("writeNewSettings");
        Router.navigate('todoList');
      }
      if (e.target.matches(`[data-id="from-timer-to-tasklist"]`)) {
        e.preventDefault();
        EventBus.emit("cancelTimer");
        Router.navigate('todoList');
      }
      if (e.target.matches(`[data-id="start-timer"]`)) {
        e.preventDefault();
        EventBus.emit("startTimer");
      }
      if (e.target.matches(`[data-id="increase-pomodoro"]`)) {
        e.preventDefault();
        EventBus.emit("increasePomodoros");
      }
      if (e.target.matches(`[data-id="fail-pomodora"]`)) {
        e.preventDefault();
        EventBus.emit("failPomodoro");
      }
      if (e.target.matches(`[data-id="finish-pomodora"]`)) {
        e.preventDefault();
        EventBus.emit("finishPomodoro");
      }
      if (e.target.matches(`[data-id="complete-task"]`)) {
        e.preventDefault();
        EventBus.emit("taskCompleted");
      }
    }


    document.body.addEventListener("click", chooseTarget)
  }
}
