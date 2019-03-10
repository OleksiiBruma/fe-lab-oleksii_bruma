require('./pop_up.less');
import templateAdd from "./pop_up_add.handlebars";
import templateEdit from "./pop_up_edit.handlebars";
import templateRemove from "./pop_up_remove.handlebars";

require("jquery-ui/ui/widgets/datepicker");

export class Pop_up_view {
  constructor() {
    this.templateAdd = templateAdd();
    this.templateEdit = templateEdit();
    this.templateRemove = templateRemove();
  }

  renderAdd() {
    document.querySelector("main").insertAdjacentHTML("beforeend", this.templateAdd);
    $(function () {
      const today = $.datepicker.formatDate("MM d, yy", new Date());
      $("#deadline").datepicker({
        dateFormat: "MM d, yy",
        defaultDate: +1
      }).attr("placeholder", today) ;
    });
  }

  renderEdit() {
    document.querySelector("main").insertAdjacentHTML("beforeend", this.templateEdit);
    $(function () {
      const today = $.datepicker.formatDate("MM d, yy", new Date());
      $("#deadline").datepicker({
        dateFormat: "MM d, yy",
        defaultDate: +1
      }).attr("placeholder", today) ;
    });
  }

  renderRemove() {
    document.querySelector("main").insertAdjacentHTML("beforeend", this.templateRemove);
  }

  closeSelf() {
    const modal = document.querySelector(".modal");
    modal.parentNode.removeChild(modal);
  }

  scanProperties() {
    const form = document.querySelector(".modal__form");
    let deadlineDate = form.querySelector("#deadline").value;
    if (!isNaN(form.querySelector("#deadline").value)) {
      deadlineDate = new Date().toISOString();
    }
    return {
      title: form.querySelector("#title").value,
      description: form.querySelector("#description").value,
      categoryId: form.querySelector("fieldset[name=category] input:checked").value,
      priority: parseInt(form.querySelector("fieldset[name=priority] input:checked").value),
      estimation: parseInt(form.querySelector("fieldset[name=estimation] input:checked").value),
      deadlineDate: deadlineDate,
    }
  }

}
