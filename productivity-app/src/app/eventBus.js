import {pop_up_controller} from "./components/pop-up/pop_up_controller";
import {database} from "./components/communication-service/dataservice";
import {task_collection_controller} from "./components/task-collection/task_collection_controller";
import {task_controller} from "./components/task/task_controller";
import {header_controller} from "./components/header/header_controller";
import {settings_controller} from "./components/settings/settings_controller";
import {timer_controller} from "./components/timer/timer_controller";
import {reports_controller} from "./components/reports/reports_controller";
import * as Router from "./router";

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
EventBus.subscribe("firstVisit", function () {
  task_collection_controller.init();
  task_collection_controller.firstVisit();
});
EventBus.subscribe("renderTaskList", function () {
  task_collection_controller.init();
});

EventBus.subscribe("renderLists", function () {
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
});
EventBus.subscribe("databaseUpdated", function () {
  if (location.pathname === "/") {
    header_controller.initFull("tasklist");
    task_controller.renderTasks(task_collection_controller.getState());
  }
  if (location.pathname.slice(0, 8) === "/reports") {
    header_controller.initBasic("reports");
    reports_controller.init(database.getData());
    header_controller.listenForSticky();
  }
  task_collection_controller.setTasks(database.getData());
  task_controller.setTasks(database.getData());
  settings_controller.initModel();
});
EventBus.subscribe('goToTaskList', function () {
  header_controller.initFull("tasklist");
  header_controller.listenForSticky();
  database.updateDataBase();
});


EventBus.subscribe('goToTimer', function () {
  header_controller.initBasic("tasklist");
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
  header_controller.initFull("tasklist");
  header_controller.listenForSticky();
  task_collection_controller.init();
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
  task_controller.renderTasks(task_collection_controller.getState());

});
EventBus.subscribe("submitEdit", function () {
  database.updateData([(database.getFIDTaskById(pop_up_controller.getTaskToBeEdited())), pop_up_controller.getScannedProperties()]);
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
EventBus.subscribe("globalToDaily", function ([id, status]) {
  task_controller.changeState([id, status]);
});

//filtering

EventBus.subscribe("updateStatus", function (arg) {
  database.updateData(arg);
});
EventBus.subscribe("setFilterStatus", function (arg) {
  task_collection_controller.setState(arg);
  task_controller.renderTasks(task_collection_controller.getState());
});

//edit mode
EventBus.subscribe("openEditModal", function (id) {
  pop_up_controller.renderEdit();
  pop_up_controller.setTaskToBeEdited(id);
});


//remove mode
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

EventBus.subscribe("addYourFirstTask", function () {
  task_collection_controller.showAddYourFirstTasks();
});
EventBus.subscribe("taskAdded", function () {
  task_collection_controller.showTaskAdded();
});
EventBus.subscribe("excellentAllDaily", function () {
  task_collection_controller.showExcellentAllDaily();
});
EventBus.subscribe("youDoNotHaveAnyTasks", function () {
  task_collection_controller.showYouDoNotHaveAnyTasks();
});
EventBus.subscribe("hideAllMessages", function () {
  task_collection_controller.hideAllMessages();
});
EventBus.subscribe("showGlobalList", function () {
  task_collection_controller.showGlobalList()
});

//settings
EventBus.subscribe('goToSettings', function () {
  settings_controller.initModel();
  header_controller.initBasic("settings");
  settings_controller.init(true);
  settings_controller.drawGraph();
  header_controller.listenForSticky();
});

EventBus.subscribe("goToSettingsCategory", function () {
  header_controller.initBasic("settings");
  settings_controller.init(false);
  header_controller.listenForSticky();
});

EventBus.subscribe("drawGraph", function () {
  settings_controller.drawGraph();
});

EventBus.subscribe("getNewSettings", function () {
  database.getSettingsData();
});

EventBus.subscribe("setNewSettings", function (data) {
  settings_controller.setNewSettingsData(data);
});
EventBus.subscribe("writeNewSettings", function () {
  database.updateSettingsData(settings_controller.getNewSettingsData());
});

//timer
EventBus.subscribe('writeActiveState', function (id) {
  task_controller.changeState([id, "ACTIVE"]);
  database.getTask(database.getFIDTaskById(null, "ACTIVE"));
});
EventBus.subscribe("setActiveState", function (activeTask) {
  timer_controller.setActiveTask(activeTask);
});
EventBus.subscribe("cancelTimer", function () {
  task_controller.changeState([timer_controller.getActiveTask().id, "DAILY_LIST"]);
});
EventBus.subscribe("startTimer", function () {
  timer_controller.startTimer(settings_controller.getSettingsData());
});
EventBus.subscribe("increasePomodoros", function () {
  timer_controller.increasePomodoros();
});
EventBus.subscribe("failPomodoro", function () {
  timer_controller.failPomodoro(settings_controller.getSettingsData());
});
EventBus.subscribe("finishPomodoro", function () {
  timer_controller.finishPomodoro(settings_controller.getSettingsData());
});
EventBus.subscribe("taskCompleted", function () {
  header_controller.initBasic("tasklist");
  timer_controller.taskCompleted(settings_controller.getSettingsData());
  header_controller.listenForSticky();
});
EventBus.subscribe("completedTaskReady", function () {
  database.updateData([database.getFIDTaskById(timer_controller.getCompletedTask().id), timer_controller.getCompletedTask()]);
});
EventBus.subscribe("setReportsState", function (arg) {
  reports_controller.setState(arg);
});
EventBus.subscribe('goToReports', function () {
  database.updateDataBase();

});
EventBus.subscribe('reportsNavigate', function ([time, type]) {
  Router.Router.navigate(`/reports\/${time}\/${type}/`);
});












