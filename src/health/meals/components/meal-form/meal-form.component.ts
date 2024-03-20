import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Meal } from "../../../shared/services/meals/meals.service";

@Component({
  selector: "meal-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["meal-form.component.scss"],
  template: ` <div class="meal-form">
    <form [formGroup]="form">
      <div class="meal-form__name">
        <label>
          <h3>Meal name</h3>
          <input type="text" placeholder="eg. eggs" formControlName="name" />
          <div class="error" *ngIf="required">Meal name is required</div>
        </label>
      </div>

      <div class="meal-form__food">
        <div class="meal-form__subtitle">
          <h3>Food</h3>
          <button
            type="button"
            class="meal-form__add"
            (click)="addIngredient()"
          >
            <img src="/img/add-white.svg" />
            Add Food
          </button>
        </div>
        <div formArrayName="ingredients">
          <label *ngFor="let c of ingredients.controls; index as i">
            <input [formControlName]="i" placeholder="eggs" />
            <span class="meal-form__remove" (click)="removeIngredient(i)">
            </span>
          </label>
        </div>
      </div>
      <div class="meal-form__submit">
        <div>
          <button
            *ngIf="!exists"
            type="button"
            class="button"
            (click)="createMeal()"
          >
            Create Meal
          </button>
          <button
            *ngIf="exists"
            type="button"
            class="button"
            (click)="updateMeal()"
          >
            Save
          </button>
          <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
        </div>

        <div class="meal-form__delete" *ngIf="exists">
          <div *ngIf="toggled">
            <p>Delete Meal?</p>
            <button class="confirm" type="button" (click)="deleteMeal()">
              Yes
            </button>
            <button class="cancel" type="button" (click)="toggle()">No</button>
          </div>
          <button
            class="button button--delete"
            type="button"
            (click)="toggle()"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  </div>`,
})
export class MealFormComponent implements OnChanges {
  toggled = false;
  exists = false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ["", Validators.required],
    ingredients: this.fb.array([""]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  get ingredients() {
    return this.form.get("ingredients") as FormArray;
  }

  get required() {
    return (
      this.form.get("name").hasError("required") &&
      this.form.get("name").touched
    );
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(""));
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  deleteMeal() {
    this.remove.emit(this.form.value);
  }
}
