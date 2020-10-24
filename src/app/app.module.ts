import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCwc-g9ujUE5toXBPgWWzu76v3WwoC4q0E',
      authDomain: 'fir-crud-47634.firebaseapp.com',
      databaseURL: 'https://fir-crud-47634.firebaseio.com',
      projectId: 'fir-crud-47634',
      storageBucket: 'fir-crud-47634.appspot.com',
      messagingSenderId: '748026569909',
      appId: '1:748026569909:web:a3ba67c777f1435fcbcafc',
    }),

    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
