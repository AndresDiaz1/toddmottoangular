import { ChangeDetectionStrategy, forwardRef, Component } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TYPE_CONTROL_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true,
};

@Component({
  selector: "workout-type",
  providers: [TYPE_CONTROL_ACCESOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["workout-type.component.scss"],
  template: `
    <div class="workout-type">
      <div
        class="workout-type__pane"
        *ngFor="let selector of selectors"
        [class.active]="selector === value"
        (click)="setSelected(selector)"
      >
        <img src="/img/{{ selector }}.svg" />
        <p>{{ selector }}</p>
      </div>
    </div>
  `,
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  selectors = ["strength", "endurance"];
  value: string;

  private onTouch: Function;
  private onModelChange: Function;

  constructor() {}

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }

  setDisabledState?(isDisabled: boolean): void {}
}
