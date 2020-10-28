import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'test',
      authDomain: 'test',
      databaseURL: 'test',
      projectId: 'test',
      storageBucket: 'test',
      messagingSenderId: 'test',
      appId: 'test',
    }),
    AngularFireStorageModule,
    AngularFirestoreModule,
  ],
  providers: [{ provide: BUCKET, useValue: 'stotrageBucket' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
