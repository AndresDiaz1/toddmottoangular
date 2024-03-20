import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireModule, FirebaseAppConfig } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { SharedModule } from "./shared/share.module";

export const ROUTES: Routes = [
  {
    path: "auth",
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      { path: "login", loadChildren: "./login/login.module#LoginModule" },
      {
        path: "register",
        loadChildren: "./register/register.module#RegisterModule",
      },
    ],
  },
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCWYejsjosZ-sZiJ-U7rVEB8-9oTzCGP_k",
  authDomain: "angular-course-todd-motto.firebaseapp.com",
  databaseURL: "https://angular-course-todd-motto-default-rtdb.firebaseio.com",
  projectId: "angular-course-todd-motto",
  storageBucket: "angular-course-todd-motto.appspot.com",
  messagingSenderId: "1086911468009",
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(), // Truco para que no cree más de 1 instancia
  ],
  declarations: [],
  providers: [],
})
export class AuthModule {}
