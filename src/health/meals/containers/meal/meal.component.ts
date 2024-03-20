import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  Meal,
  MealsService,
} from "../../../shared/services/meals/meals.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "meal",
  styleUrls: ["meal.component.scss"],
  template: ` <div class="meal">
    <div class="meal__title">
      <h1>
        <img src="/img/food.svg" />
        <span *ngIf="meal$ | async as meal; else title"
          >{{ meal.name ? "Edit" : "Create" }} Meal</span
        >
        <ng-template #title>Loading...</ng-template>
      </h1>
    </div>
    <div *ngIf="meal$ | async as meal; else loading">
      <meal-form
        [meal]="meal"
        (update)="updateMeal($event)"
        (remove)="removeMeal($event)"
        (create)="addMeal($event)"
      ></meal-form>
    </div>
    <ng-template #loading>
      <div class="message">
        <img src="/img/loading.svg" />
        Fetching meal
      </div>
    </ng-template>
  </div>`,
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.switchMap((param) =>
      this.mealsService.getMeal(param.id)
    ) as Observable<Meal>;
  }

  async addMeal(event: Meal) {
    await this.mealsService.addmeal(event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(["meals"]);
  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
