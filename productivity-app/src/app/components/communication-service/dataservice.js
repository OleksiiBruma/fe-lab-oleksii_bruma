import { EventBus } from '../../eventBus';

const firebase = require('firebase/app');
require('firebase/database');

export class Database {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCIOfHq8ULvkGkw9Xr700E1TxNxGx52sKQ',
      authDomain: 'prodapp-be142.firebaseapp.com',
      databaseURL: 'https://prodapp-be142.firebaseio.com',
      projectId: 'prodapp-be142',
      storageBucket: 'prodapp-be142.appspot.com',
      messagingSenderId: '231543741919',
    });
    this.alltasks = {};
    this.settings = {};
    this.remoteTasks = firebase.database().ref('tasks');
    this.remoteSettings = firebase.database().ref('settings');
  }

  updateSettingsData(newData) {
    if (!newData) {
      return;
    }
    this.remoteSettings.set(newData, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('settings have been updated successfully');
      }
    });
  }

  getSettingsData() {
    this.remoteSettings.once('value').then((snapshot) => {
      this.settings = snapshot.val();
      EventBus.emit('setNewSettings', this.settings);
    });
  }

  setUpdatedData(data) {
    this.alltasks = data;
    EventBus.emit('databaseUpdated');
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
      .then(() => {
        console.log('success!: new task has been added');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateData(arg) {
    this.remoteTasks.child(`/${arg[0]}/`).update(arg[1]).then(() => {
      console.log('Success - new data have been stored');
    }).catch((error) => {
      console.log(error);
    });
  }

  getTask(FID) {
    this.remoteTasks.child(`/${FID}/`).once('value').then((task) => {
      EventBus.emit('setActiveState', task.val());
    });
  }

  getFIDTaskById(id, status) {
    const tasks = this.alltasks;
    let FID = 0;
    Object.keys(tasks).forEach((task) => {
      if (tasks[task].id === Number(id)) {
        FID = task;
      }
      if (tasks[task].status === status) {
        FID = task;
      }
    });
    return FID;
  }

  deleteData(id) {
    this.remoteTasks.child(`/${id}/`).remove()
      .then(() => {
        console.log('items removed');
        database.updateDataBase();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}


export const database = new Database();
