import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { MealsService } from "./services/meals/meals.service";
import { ListItemComponent } from "./components/list-item/list-item.component";
import { WorkoutsService } from "./services/workouts/workouts.service";
import { JoinPipe } from "./pipes/join.pipe";
import { WorkoutPipe } from "./pipes/workout.pipe";

@NgModule({
  imports: [CommonModule, RouterModule, AngularFireDatabaseModule],
  declarations: [ListItemComponent, JoinPipe, WorkoutPipe],
  exports: [ListItemComponent, JoinPipe, WorkoutPipe],
})
export class SharedModule {
  // Este truco es para que no haya 2 instancias del mismo provider 'AuthService'
  // 2 instancias porque se importa en login y en register
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MealsService, WorkoutsService],
    };
  }
}
