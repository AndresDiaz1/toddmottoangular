import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "..//auth/shared/guards/auth.guard";
import { SharedModule } from "./shared/share.module";

export const ROUTES: Routes = [
  {
    path: "schedule",
    loadChildren: "./schedule/schedule.module#ScheduleModule",
    canActivate: [AuthGuard],
  },
  {
    path: "meals",
    loadChildren: "./meals/meals.module#MealsModule",
    canActivate: [AuthGuard],
  },
  {
    path: "workouts",
    loadChildren: "./workouts/workouts.module#WorkoutsModule",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), SharedModule.forRoot()],
})
export class HealthModule {}
