import {pop_up_controller} from "./components/pop-up/pop_up_controller";
import {database} from "./components/communication-service/dataservice";
import {task_collection_controller} from "./components/task-collection/task_collection_controller";
import {task_controller} from "./components/task/task_controller";
import {header_controller} from "./components/header/header_controller";
import {settings_controller} from "./components/settings/settings_controller";
import {timer_controller} from "./components/timer/timer_controller";
import {reports_controller} from "./components/reports/reports_controller";

export const EventBus = {
  handlers: [],
  emit: function (eventName, args) {
    this.handlers.filter(function (handler) {
      return handler.eventName === eventName;
    }).forEach(function (handler) {
      handler.handlerFn(args);
    });
  },
  subscribe: function (eventName, handlerFn) {
    this.handlers.push(
      {'eventName': eventName, 'handlerFn': handlerFn}
    )
  }
};
EventBus.subscribe("databaseUpdated", function () {
  task_collection_controller.setTasks(database.getData());
  task_controller.setTasks(database.getData());
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
  task_controller.renderTasks(task_collection_controller.getState());
});
EventBus.subscribe('goToTaskList', function () {
  header_controller.init();
  header_controller.listenForSticky();
  task_collection_controller.init();
  database.updateDataBase();
});
EventBus.subscribe('goToReports', function () {
  header_controller.init();
  reports_controller.init();
  header_controller.listenForSticky();
});
EventBus.subscribe('goToSettings', function () {
  header_controller.init();
  settings_controller.init();
  header_controller.listenForSticky();
});
EventBus.subscribe('goToTimer', function () {
  header_controller.init();
  timer_controller.init();
  header_controller.listenForSticky();
});
EventBus.subscribe('addNewTask', function () {
  event.preventDefault();
  pop_up_controller.renderAdd();
});
EventBus.subscribe('closeModal', function () {
  pop_up_controller.closeSelf();
});
EventBus.subscribe('submitNewTask', function () {
  pop_up_controller.setNewTaskData();
  database.addNewTaskData(pop_up_controller.getNewTaskData());
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
  task_controller.renderTasks(task_collection_controller.getState());

});
EventBus.subscribe("submitEdit", function () {
  database.updateData([(database.getFIDTaskById(pop_up_controller.getTaskToBeEdited())), pop_up_controller.getScannedProperties()]);
  pop_up_controller.closeSelf();
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
  task_controller.renderTasks(task_collection_controller.getState());
});
EventBus.subscribe('toggleGlobalList', function () {
  task_collection_controller.toggleGlobalList();
});
EventBus.subscribe("deleteAllData", function () {
  database.removeAllData();
});
EventBus.subscribe("globalToDaily", function (arg) {
  task_controller.globalToDaily(arg);
});
EventBus.subscribe("updateStatus", function (arg) {
  database.updateData(arg);
});
EventBus.subscribe("setFilterStatus", function (arg) {
  task_collection_controller.setState(arg);
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
  task_controller.renderTasks(task_collection_controller.getState());
});
EventBus.subscribe("openEditModal", function (id) {
  pop_up_controller.renderEdit();
  pop_up_controller.setTaskToBeEdited(id);
});
EventBus.subscribe("RemoveMode", function () {
  task_collection_controller.removeMode();
});
EventBus.subscribe("toggleSelectedTask", function (arg) {
  task_controller.toggleSelectedTask(arg)
});
EventBus.subscribe("selectAll", function (list) {
  task_controller.selectAll(list);
});
EventBus.subscribe("deselectAll", function (list) {
  task_controller.deselectAll(list);
});
EventBus.subscribe("removeModeOn", function () {
  task_controller.removeModeOn();
  task_collection_controller.removeModeOn();
});

EventBus.subscribe("removeModeOff", function () {
  task_controller.removeModeOff();
  task_collection_controller.removeModeOff();
});
EventBus.subscribe("openTrashCount", function () {
  header_controller.openTrashCount();
});
EventBus.subscribe("closeTrashCount", function () {
  header_controller.closeTrashCount();
});
EventBus.subscribe("updateTrashCount", function (amount) {
  header_controller.updateTrashCount(amount);
});
EventBus.subscribe("isChecked", function () {
  header_controller.isChecked();
});
EventBus.subscribe("openRemoveModal", function () {
  pop_up_controller.renderRemove();
});
EventBus.subscribe("closeRemoveModal", function () {
  pop_up_controller.closeSelf();
});
EventBus.subscribe("submitDeleteTask", function () {
  task_controller.removeTasks();
  pop_up_controller.closeSelf();
});
EventBus.subscribe("deleteTask", function (id) {
  database.deleteData(database.getFIDTaskById(id));
  header_controller.closeTrashCount();
});







