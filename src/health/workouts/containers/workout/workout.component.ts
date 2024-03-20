import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/switchMap";
import {
  Workout,
  WorkoutsService,
} from "../../../shared/services/workouts/workouts.service";

@Component({
  selector: "workout",
  styleUrls: ["workout.component.scss"],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/img/workout.svg" />
          <span *ngIf="workout$ | async as workout; else title"
            >{{ workout.name ? "Edit" : "Create" }} Workout</span
          >
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading">
        <workout-form
          [workout]="workout"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)"
          (create)="addWorkout($event)"
        ></workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg" />
          Fetching workout
        </div>
      </ng-template>
    </div>
  `,
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.switchMap((param) =>
      this.workoutsService.getWorkout(param.id)
    ) as Observable<Workout>;
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(["workouts"]);
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
