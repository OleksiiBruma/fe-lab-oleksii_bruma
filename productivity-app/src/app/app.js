/* root component starts here */
require('assets/less/main.less'); // include general styles
import {EventBus} from "./eventBus";
import {Router} from "./router.js"
import {database} from "./components/communication-service/dataservice.js";
import {header_controller} from "./components/header/header_controller.js"
import {reports_controller} from "./components/reports/reports_controller.js"
import {task_list_controller} from "./components/task-list/task_list_controller.js"
import {settings_controller} from "./components/settings/settings_controller.js"
import {timer_controller} from "./components/timer/timer_controller.js"
import {pop_up_controller} from "./components/pop-up/pop_up_controller.js"

Router.config({mode: 'history'});

Router
  .add(/settings/, function () {
    header_controller.init();
    settings_controller.init();
    header_controller.listenForSticky();
  })
  .add(/timer/, function () {
    header_controller.init();
    timer_controller.init();
    header_controller.listenForSticky();
  })
  .add(/reports/, function () {
    header_controller.init();
    reports_controller.init();
    header_controller.listenForSticky();
  })
  .add(function () {
    Router.navigate('');
    header_controller.init();
    task_list_controller.init();
    header_controller.listenForSticky();
  })
  .check().listen();

class Global_controller {
  constructor() {

    EventBus.subscribe('goToTaskList', function () {
      event.preventDefault();
      Router.navigate();
    });
    EventBus.subscribe('goToReports', function () {
      event.preventDefault();
      Router.navigate(/reports/);
    });
    EventBus.subscribe('goToSettings', function () {
      event.preventDefault();
      Router.navigate(/settings/);
    });
    EventBus.subscribe('goToTimer', function () {
      event.preventDefault();
      Router.navigate(/timer/);
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
      pop_up_controller.closeSelf();
      database.addNewTaskData(pop_up_controller.getNewTaskData());
      database.getData();
    });
  }

  addEventListeners() {

    function chooseTarget(e) {
      if (e.target.classList.contains("menu__link--icon-list")) {
        EventBus.emit('goToTaskList');
      }
      if (e.target.classList.contains("menu__link--icon-statistics")) {
        EventBus.emit('goToReports');
      }
      if (e.target.classList.contains("menu__link--icon-settings")) {
        EventBus.emit('goToSettings');
      }
      if (e.target.classList.contains("task__indicator")) {
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

    }

    document.body.addEventListener("click", chooseTarget)
  }
}

const global_controller = new Global_controller();
global_controller.addEventListeners();



