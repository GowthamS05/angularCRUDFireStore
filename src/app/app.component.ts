import { Component } from '@angular/core';
import { AppService } from './app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'firestoreCRUD';
  isUpdated = false;
  model: any = {};
  tableVal: any = [];
  constructor(public appservice: AppService) {
    this.getEmployee();
  }
  getEmployee() {
    this.appservice.get_Allemployee().subscribe((data) => {
      let emp;
      emp = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          email: e.payload.doc.data()['email'],
          password: e.payload.doc.data()['password'],
        };
      });
      this.tableVal = emp;
    });
  }

  onSubmit(f: NgForm) {
    let data = f.form.value;
    if (f.form.valid && !this.isUpdated) {
      this.appservice
        .create_Newemployee(data)
        .then((res) => {
          f.resetForm();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (f.form.valid && this.isUpdated) {
      this.appservice.update_employee(this.model.id, data).then((val) => {
        this.isUpdated = false;
        f.resetForm();
      });
    }
  }
  deleteEmployee(id) {
    this.appservice.delete_employee(id);
  }
  editEmployee(record) {
    this.isUpdated = true;
    this.model.id = record.id;
    this.model.firstName = record.firstName;
    this.model.lastName = record.lastName;
    this.model.email = record.email;
    this.model.password = record.password;
  }
}
