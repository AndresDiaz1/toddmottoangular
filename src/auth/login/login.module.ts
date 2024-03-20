import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./containers/login/login.component";
import { SharedModule } from "../shared/share.module";

export const ROUTES: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule, // no necesita el forRoot porque ya lo tiene el authModule, que viene siendo padre de este modulo
  ],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule {}
