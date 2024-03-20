import { NgModule } from "@angular/core";
import { WorkoutsComponent } from "./containers/workouts/workouts.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

export const ROUTES: Routes = [
  {
    path: "",
    component: WorkoutsComponent,
  },
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(ROUTES)],
  declarations: [WorkoutsComponent],
})
export class WorkoutsModule {}
