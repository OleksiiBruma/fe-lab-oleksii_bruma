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
    this.alltasks = {};
    this.remoteTasks = firebase.database().ref("tasks");

  }
  setUpdatedData(data){
    this.alltasks = data;
    EventBus.emit("databaseUpdated");
  }

  updateDataBase() {
    this.remoteTasks.on('value', (data) => {
      this.setUpdatedData(data.val());
    });
  }

  getData() {
    return this.alltasks;
  }

  addNewTaskData(newTask) {
    this.remoteTasks.push(newTask)
      .then(function () {
        console.log("success!: new task has been added")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  removeAllData() {
    this.remoteTasks.remove();
  }

  updateData(arg) {
    this.remoteTasks.child(`/${arg[0]}/`).update(arg[1]);
  }

  getFIDTaskById(id) {
    const tasks = this.alltasks;
    let FID = 0;
    Object.keys(tasks).forEach(function (task) {
        if (tasks[task].id === +id) {
          FID = task
        }
      }
    );
    return FID;
  }

  deleteData(id) {
    this.remoteTasks.child(`/${id}/`).remove()
      .then(function () {
        console.log("items removed");
        database.updateDataBase();
      })
      .catch(function (error) {
      console.log(error)
    });
  }
}


export const database = new Database();
