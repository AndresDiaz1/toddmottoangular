import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "../../../../auth/shared/services/auth/auth.service";
import { Store } from "store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { of } from "rxjs/observable/of";

export interface Workout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<Workout[]> = this.db
    .list(`workouts/${this.uid}`)
    .do<Workout[]>((next) => this.store.set("workouts", next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string): Observable<Workout | {}> {
    if (!key) {
      return of({});
    }
    return this.store
      .select<Workout[]>("workouts")
      .filter(Boolean)
      .map((workouts: Workout[]) =>
        workouts.find((workout) => workout.$key === key)
      );
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
