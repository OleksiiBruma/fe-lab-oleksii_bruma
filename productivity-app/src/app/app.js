/* root component starts here */
import {EventBus} from "./eventBus";
import {Router} from "./router.js"
import {header_controller} from "./components/header/header_controller.js"
import {reports_controller} from "./components/reports/reports_controller.js"
import {task_list_controller} from "./components/task-list/task_list_controller.js"
import {settings_controller} from "./components/settings/settings_controller.js"
import {timer_controller} from "./components/timer/timer_controller.js"
const firebase = require("firebase/app");
require("firebase/firestore");
require('assets/less/main.less'); // include general styles
import {Websockets} from "./components/communication-service/websockets.js";
const dataFB = new Websockets();
dataFB.getData();

// configuration
Router.config({mode: 'history'});

// returning the user to the initial state

// adding routes


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
    header_controller.init();
    task_list_controller.init();
    header_controller.listenForSticky();

  })
  .check().listen();

class Global_controller{
  constructor(){

    EventBus.subscribe('goToTaskList',function(){
      event.preventDefault();
      Router.navigate();
    });
    EventBus.subscribe('goToReports',function(){
      event.preventDefault();
      Router.navigate(/reports/);
    });
    EventBus.subscribe('goToSettings',function(){
      event.preventDefault();
      Router.navigate(/settings/);
    });
    EventBus.subscribe('goToTimer',function(){
      event.preventDefault();
      Router.navigate(/timer/);
    });
  }
  addEventListeners(){

    function chooseTarget(e){
      if(e.target.classList.contains("menu__link--icon-list")){
        EventBus.emit('goToTaskList');
      }
      if(e.target.classList.contains("menu__link--icon-statistics")){
        EventBus.emit('goToReports');
      }
      if(e.target.classList.contains("menu__link--icon-settings")){
        EventBus.emit('goToSettings');
      }
      if(e.target.classList.contains("task__indicator")){
        EventBus.emit('goToTimer');
      }

    }
    document.body.addEventListener("click", chooseTarget)
  }
}
const global_controller = new Global_controller();
global_controller.addEventListeners();



