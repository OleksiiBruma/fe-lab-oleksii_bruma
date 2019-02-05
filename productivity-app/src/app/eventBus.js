import {Router} from "./router";
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
EventBus.subscribe("databaseUpdated",function(){
  task_collection_controller.setTasks(database.getData());
  task_controller.setTasks(database.getData());
  task_collection_controller.globalListRender();
  task_controller.renderTasks(task_collection_controller.getState());
  console.log("database updated");
})
EventBus.subscribe('goToTaskList', function () {
  Router.navigate('');
  header_controller.init();
  header_controller.listenForSticky();
  task_collection_controller.init();
  task_collection_controller.globalListRender();
  task_controller.renderTasks(task_collection_controller.getState());
  database.updateDataBase();
});
EventBus.subscribe('goToReports', function () {
  Router.navigate(/reports/);
  header_controller.init();
  reports_controller.init();
  header_controller.listenForSticky();
});
EventBus.subscribe('goToSettings', function () {
  Router.navigate(/settings/);
  header_controller.init();
  settings_controller.init();
  header_controller.listenForSticky();
});
EventBus.subscribe('goToTimer', function () {
  Router.navigate(/timer/);
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
  event.preventDefault();
  pop_up_controller.setNewTaskData();
  database.addNewTaskData(pop_up_controller.getNewTaskData());
  task_collection_controller.globalListRender();
  task_controller.renderTasks(task_collection_controller.getState());

});
EventBus.subscribe('toggleGlobalList',function(){
  task_collection_controller.toggleGlobalList();
});
EventBus.subscribe("deleteAllData",function(){
  database.removeAllData();
});
EventBus.subscribe("globalToDaily",function(arg){
  task_controller.globalToDaily(arg);
});
EventBus.subscribe("updateStatus",function(arg){
  database.updateData(arg);
});
EventBus.subscribe("setFilterStatus",function(arg){
  task_collection_controller.setState(arg);
  task_collection_controller.globalListRender();
  task_controller.renderTasks(task_collection_controller.getState());
});








