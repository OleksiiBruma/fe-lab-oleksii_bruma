import { pop_up_controller } from './components/pop-up/pop_up_controller';
import { database } from './components/communication-service/dataservice';
import { task_collection_controller } from './components/task-collection/task_collection_controller';
import { task_controller } from './components/task/task_controller';
import { header_controller } from './components/header/header_controller';
import { settings_controller } from './components/settings/settings_controller';
import { timer_controller } from './components/timer/timer_controller';
import { reports_controller } from './components/reports/reports_controller';
import * as Router from './router';

export const EventBus = {
  handlers: [],
  emit(eventName, args) {
    this.handlers.filter(handler => handler.eventName === eventName).forEach((handler) => {
      handler.handlerFn(args);
    });
  },
  subscribe(eventName, handlerFn) {
    this.handlers.push(
      { eventName, handlerFn },
    );
  },
};
EventBus.subscribe('firstVisit', () => {
  task_collection_controller.init();
  task_collection_controller.firstVisit();
});
EventBus.subscribe('renderTaskList', () => {
  task_collection_controller.init();
});

EventBus.subscribe('renderLists', () => {
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
});
EventBus.subscribe('databaseUpdated', () => {
  if (location.pathname === '/') {
    header_controller.initFull('tasklist');
    task_controller.renderTasks(task_collection_controller.getState());
  }
  if (location.pathname.slice(0, 8) === '/reports') {
    header_controller.initBasic('reports');
    reports_controller.init(database.getData());
    header_controller.listenForSticky();
  }
  task_collection_controller.setTasks(database.getData());
  task_controller.setTasks(database.getData());
  settings_controller.initModel();
});
EventBus.subscribe('goToTaskList', () => {
  header_controller.initFull('tasklist');
  header_controller.listenForSticky();
  database.updateDataBase();
});


EventBus.subscribe('goToTimer', () => {
  header_controller.initBasic('tasklist');
  timer_controller.init();
  header_controller.listenForSticky();
});
EventBus.subscribe('addNewTask', () => {
  event.preventDefault();
  pop_up_controller.renderAdd();
});
EventBus.subscribe('closeModal', () => {
  pop_up_controller.closeSelf();
});
EventBus.subscribe('submitNewTask', () => {
  pop_up_controller.setNewTaskData();
  database.addNewTaskData(pop_up_controller.getNewTaskData());
  header_controller.initFull('tasklist');
  header_controller.listenForSticky();
  task_collection_controller.init();
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
  task_controller.renderTasks(task_collection_controller.getState());
});
EventBus.subscribe('submitEdit', () => {
  database.updateData([database.getFIDTaskById(pop_up_controller.getTaskToBeEdited()), pop_up_controller.getScannedProperties()]);
  task_collection_controller.globalListRender();
  task_collection_controller.dailyListRender();
  task_controller.renderTasks(task_collection_controller.getState());
});
EventBus.subscribe('toggleGlobalList', () => {
  task_collection_controller.toggleGlobalList();
});

EventBus.subscribe('globalToDaily', ([id, status]) => {
  task_controller.changeState([id, status]);
});

// filtering

EventBus.subscribe('updateStatus', (arg) => {
  database.updateData(arg);
});
EventBus.subscribe('setFilterStatus', (arg) => {
  task_collection_controller.setState(arg);
  task_controller.renderTasks(task_collection_controller.getState());
});

// edit mode
EventBus.subscribe('openEditModal', (id) => {
  pop_up_controller.renderEdit();
  pop_up_controller.setTaskToBeEdited(id);
});


// remove mode
EventBus.subscribe('RemoveMode', () => {
  task_collection_controller.removeMode();
});
EventBus.subscribe('toggleSelectedTask', (arg) => {
  task_controller.toggleSelectedTask(arg);
});
EventBus.subscribe('selectAll', (list) => {
  task_controller.selectAll(list);
});
EventBus.subscribe('deselectAll', (list) => {
  task_controller.deselectAll(list);
});
EventBus.subscribe('removeModeOn', () => {
  task_controller.removeModeOn();
  task_collection_controller.removeModeOn();
});

EventBus.subscribe('removeModeOff', () => {
  task_controller.removeModeOff();
  task_collection_controller.removeModeOff();
});
EventBus.subscribe('openTrashCount', () => {
  header_controller.openTrashCount();
});
EventBus.subscribe('closeTrashCount', () => {
  header_controller.closeTrashCount();
});
EventBus.subscribe('updateTrashCount', (amount) => {
  header_controller.updateTrashCount(amount);
});
EventBus.subscribe('isChecked', () => {
  header_controller.isChecked();
});
EventBus.subscribe('openRemoveModal', () => {
  pop_up_controller.renderRemove();
});
EventBus.subscribe('closeRemoveModal', () => {
  pop_up_controller.closeSelf();
});
EventBus.subscribe('submitDeleteTask', () => {
  task_controller.removeTasks();
  pop_up_controller.closeSelf();
});
EventBus.subscribe('deleteTask', (id) => {
  database.deleteData(database.getFIDTaskById(id));
  header_controller.closeTrashCount();
});

EventBus.subscribe('addYourFirstTask', () => {
  task_collection_controller.showAddYourFirstTasks();
});
EventBus.subscribe('taskAdded', () => {
  task_collection_controller.showTaskAdded();
});
EventBus.subscribe('excellentAllDaily', () => {
  task_collection_controller.showExcellentAllDaily();
});
EventBus.subscribe('youDoNotHaveAnyTasks', () => {
  task_collection_controller.showYouDoNotHaveAnyTasks();
});
EventBus.subscribe('hideAllMessages', () => {
  task_collection_controller.hideAllMessages();
});
EventBus.subscribe('showGlobalList', () => {
  task_collection_controller.showGlobalList();
});

// settings
EventBus.subscribe('goToSettings', () => {
  settings_controller.initModel();
  header_controller.initBasic('settings');
  settings_controller.init(true);
  settings_controller.drawGraph();
  header_controller.listenForSticky();
});

EventBus.subscribe('goToSettingsCategory', () => {
  header_controller.initBasic('settings');
  settings_controller.init(false);
  header_controller.listenForSticky();
});

EventBus.subscribe('drawGraph', () => {
  settings_controller.drawGraph();
});

EventBus.subscribe('getNewSettings', () => {
  database.getSettingsData();
});

EventBus.subscribe('setNewSettings', (data) => {
  settings_controller.setNewSettingsData(data);
});
EventBus.subscribe('writeNewSettings', () => {
  database.updateSettingsData(settings_controller.getNewSettingsData());
});

// timer
EventBus.subscribe('writeActiveState', (id) => {
  task_controller.changeState([id, 'ACTIVE']);
  database.getTask(database.getFIDTaskById(null, 'ACTIVE'));
});
EventBus.subscribe('setActiveState', (activeTask) => {
  timer_controller.setActiveTask(activeTask);
});
EventBus.subscribe('cancelTimer', () => {
  task_controller.changeState([timer_controller.getActiveTask().id, 'DAILY_LIST']);
});
EventBus.subscribe('startTimer', () => {
  timer_controller.startTimer(settings_controller.getSettingsData());
});
EventBus.subscribe('increasePomodoros', () => {
  timer_controller.increasePomodoros();
});
EventBus.subscribe('failPomodoro', () => {
  timer_controller.failPomodoro(settings_controller.getSettingsData());
});
EventBus.subscribe('finishPomodoro', () => {
  timer_controller.finishPomodoro(settings_controller.getSettingsData());
});
EventBus.subscribe('taskCompleted', () => {
  header_controller.initBasic('tasklist');
  timer_controller.taskCompleted(settings_controller.getSettingsData());
  header_controller.listenForSticky();
});
EventBus.subscribe('completedTaskReady', () => {
  database.updateData([database.getFIDTaskById(timer_controller.getCompletedTask().id), timer_controller.getCompletedTask()]);
});
EventBus.subscribe('setReportsState', (arg) => {
  reports_controller.setState(arg);
});
EventBus.subscribe('goToReports', () => {
  database.updateDataBase();
});
EventBus.subscribe('reportsNavigate', ([time, type]) => {
  Router.Router.navigate(`/reports\/${time}\/${type}/`);
});

EventBus.subscribe('changeStatusBackToDaily', () => {
  task_controller.changeState([timer_controller.getActiveTask().id, 'DAILY']);
});
