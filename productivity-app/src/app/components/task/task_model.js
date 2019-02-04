export class Task_model {
  constructor(){
      this.tasks = []
    }
    setTasks(newTasks){
      this.tasks = newTasks
    }
    getTasks(){
      return this.tasks;
    }
}
