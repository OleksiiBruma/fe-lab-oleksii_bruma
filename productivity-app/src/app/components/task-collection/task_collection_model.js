export class Task_collection_model {
  constructor() {
    this.tasks = [];
    this.state = {
      filterState: 0,
      todoView: 1,
    };
  }
getState(){
   return this.state;
}
setState(stateInfo){
    this.state[stateInfo[0]] = parseInt(stateInfo[1]);
}

  setTasks(newTasks) {
    this.tasks = newTasks
  }

  getTasks() {
    return this.tasks;
  }
}
