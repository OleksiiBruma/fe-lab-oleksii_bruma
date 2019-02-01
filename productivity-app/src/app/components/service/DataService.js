class DataService {
  constructor() {
    this.allTasks = []
  }

  addNewTaskData(newTask){
    this.allTasks.push(newTask)
  }
  getAllTasksData(){
    console.log(this.allTasks);
  }
}

export const dataService = new DataService();
