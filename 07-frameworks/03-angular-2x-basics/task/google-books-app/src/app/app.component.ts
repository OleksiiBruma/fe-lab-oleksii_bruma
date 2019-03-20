import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'
import {ConfigService} from "./config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public book: '';
  public form: FormGroup = new FormGroup({
    book: new FormControl()
  });
  records = [];
  userBooks = [];
  constructor(private service : ConfigService){

  }
  formatDate(data){
    let date = new Date(data);
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!

    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + ' ' + mm + ' ' + yyyy;
  }
  addToUser(item){
    if (this.userBooks.some((id) => item.id === id.id)) {
      return
    }
    this.userBooks.unshift(item)
  }
  removeBookFromUserShelf(item){
    this.userBooks = this.userBooks.filter(id => item.id !== id.id);
  }

  submit(){
    this.service.getData(this.form.value.book).subscribe(data =>{
      this.records = data.items;
      console.log(this.records)
    });
    this.form.reset();
  }
}
