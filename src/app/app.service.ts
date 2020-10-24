import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(public fireservices: AngularFirestore) {}
  get_Allemployee() {
    return this.fireservices.collection('Employee').snapshotChanges();
  }
  create_Newemployee(Record) {
    return this.fireservices.collection('Employee').add(Record);
  }

  update_employee(recordid, record) {
    return this.fireservices.doc('Employee/' + recordid).update(record);
  }

  delete_employee(record_id) {
    this.fireservices.doc('Employee/' + record_id).delete();
  }
}
