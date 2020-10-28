import { Component } from '@angular/core';
import { AppService } from './app.service';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

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
  selectedFile: File = null;
  downloadURL: Observable<string>;

  constructor(
    public appservice: AppService,
    private storage: AngularFireStorage
  ) {
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
          imgUrl: e.payload.doc.data()['imgUrl'],
        };
      });
      this.tableVal = emp;
      console.log(this.tableVal);
    });
  }

  onSubmit(f: NgForm) {
    let data = f.form.value;
    data.imgUrl = this.model.imgUrl;
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
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Flats/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Flats/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.model.imgUrl = url;
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log('status', url);
        }
      });
  }
}
