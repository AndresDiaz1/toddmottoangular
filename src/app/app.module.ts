import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { Store } from "store";

// feature modules

// containers
import { AppComponent } from "./containers/app/app.component";
import { AuthModule } from "../auth/auth.module";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { AppNavComponent } from "./components/app-nav/app-nav.component";
import { HealthModule } from "../health/health.module";

// components

// routes
export const ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "schedule",
  },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HealthModule,
  ],
  declarations: [AppComponent, AppHeaderComponent, AppNavComponent],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWYejsjosZ-sZiJ-U7rVEB8-9oTzCGP_k",
  authDomain: "angular-course-todd-motto.firebaseapp.com",
  databaseURL: "https://angular-course-todd-motto-default-rtdb.firebaseio.com",
  projectId: "angular-course-todd-motto",
  storageBucket: "angular-course-todd-motto.appspot.com",
  messagingSenderId: "1086911468009",
  appId: "1:1086911468009:web:92ab6b39df3ba00f0c7b78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/
