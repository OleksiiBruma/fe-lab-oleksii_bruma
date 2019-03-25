import $ from 'jquery';
import { EventBus } from '../../eventBus';
import firebase from 'firebase/app';
import firebasData from 'firebase/database';

export class Database {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCIOfHq8ULvkGkw9Xr700E1TxNxGx52sKQ',
      authDomain: 'prodapp-be142.firebaseapp.com',
      databaseURL: 'https://prodapp-be142.firebaseio.com',
      messagingSenderId: '231543741919',
      projectId: 'prodapp-be142',
      storageBucket: 'prodapp-be142.appspot.com'
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
        $('main').notification({ text: 'Unable to save settings. Try again later', type: 'success' });
      } else {
        $('main').notification({ text: 'Settings was successfully saved', type: 'success' });
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
        $('main').notification({ type: 'success', text: 'Your task was successfully saved' });
      })
      .catch((error) => {
        $('main').notification({ type: 'error', text: 'Unable to save your task. Try again later' });
      });
  }

  updateData(arg) {
    this.remoteTasks.child(`/${arg[0]}/`).update(arg[1]).then(() => {
      $('main').notification({ type: 'success', text: 'New data have been stored' });
    }).catch((error) => {
      $('main').notification({ type: 'error', text: 'Something went wrong. Try again later :(' });
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
        $('main').notification({type: 'success', text: 'Your task was successfully removed'});
        database.updateDataBase();
      })
      .catch((error) => {
        $('main').notification({
          type: 'success',
          text: 'Unable to remove task. Try again later'
        });
      });
  }
}


export const database = new Database();
