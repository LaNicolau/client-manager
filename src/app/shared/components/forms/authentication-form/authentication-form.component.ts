import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-authentication-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.scss',
})
export class AuthenticationFormComponent {
  private _fb = inject(FormBuilder);

  public type = input<string>('');

  /**
   * Formulário para cadastro ou login do usuário.
   */
  formUser: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /**
   * Getter para o controle do campo `email` no formulário.
   * @returns {AbstractControl | null} Controle do campo `email`, ou `null` se não encontrado.
   */
  get email() {
    return this.formUser.get('email');
  }

  /**
   * Getter para o controle do campo `password` no formulário.
   * @returns {AbstractControl | null} Controle do campo `password`, ou `null` se não encontrado.
   */
  get password() {
    return this.formUser.get('password');
  }
}
