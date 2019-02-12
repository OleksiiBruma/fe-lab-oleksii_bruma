require('./pop_up.less');
import templateAdd from "./pop_up_add.handlebars";
import templateEdit from "./pop_up_edit.handlebars";
import templateRemove from "./pop_up_remove.handlebars";

export class Pop_up_view {
  constructor() {
    this.templateAdd = templateAdd();
    this.templateEdit = templateEdit();
    this.templateRemove = templateRemove();
  }

  renderAdd() {
    document.querySelector("main").insertAdjacentHTML("beforeend", this.templateAdd);
  }

  renderEdit() {

    document.querySelector("main").insertAdjacentHTML("beforeend", this.templateEdit);
  }

  renderRemove() {
    document.querySelector("main").insertAdjacentHTML("beforeend", this.templateRemove);
  }

  closeSelf() {
    document.querySelector(".modal").remove();
  }

  scanProperties() {
    let form = document.forms.modal;
    let deadlineDate =form.deadline.value;
    if(!isNaN(form.deadline.value)){
       deadlineDate = new Date().toISOString();
    return {
      title: form.title.value,
      description: form.description.value,
      categoryId: form.category.value,
      priority: parseInt(form.priority.value),
      estimation: parseInt(form.estimation.value),
      deadlineDate: deadlineDate,
    }
    }
  }
}
