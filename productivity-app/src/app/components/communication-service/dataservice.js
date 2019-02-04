import {EventBus} from "../../eventBus";

const firebase = require("firebase/app");
require("firebase/database");

export class Database {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyCIOfHq8ULvkGkw9Xr700E1TxNxGx52sKQ",
      authDomain: "prodapp-be142.firebaseapp.com",
      databaseURL: "https://prodapp-be142.firebaseio.com",
      projectId: "prodapp-be142",
      storageBucket: "prodapp-be142.appspot.com",
      messagingSenderId: "231543741919"
    });
    this.alltasks = [];
    this.remoteTasks = firebase.database().ref("tasks");
    this.remoteTasks.on('value', (data) => {this.alltasks = data.val(); console.log(this.alltasks)});
  }

  getData() {
    return this.alltasks;
  }

  addNewTaskData(newTask) {
    this.remoteTasks.push(newTask)
  }
}


export const database = new Database();
