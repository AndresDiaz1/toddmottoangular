import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./services/auth/auth.service";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthFormComponent],
  //providers: [AuthService], No se aplica este provider aca porque toca hacer el truco de abajo del forRoot
  exports: [AuthFormComponent],
})
export class SharedModule {
  // Este truco es para que no haya 2 instancias del mismo provider 'AuthService'
  // 2 instancias porque se importa en login y en register
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService],
    };
  }
}
