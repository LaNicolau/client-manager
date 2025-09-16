import { Component, input, output, ViewChild } from '@angular/core';
import { AuthenticationFormComponent } from '../../forms/authentication-form/authentication-form.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { User } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-auth-wrapper',
  imports: [AuthenticationFormComponent, MatButtonModule, MatIcon, RouterLink],
  templateUrl: './auth-wrapper.component.html',
  styleUrl: './auth-wrapper.component.scss',
})
export class AuthWrapperComponent {
  /**
   * Título exibido no topo da página de autenticação.
   */
  public title = input.required<string>();

  /**
   * Tipo de operação: `'login'` ou `'register'`.
   */
  public type = input.required<string>();

  /**
   * Evento emitido quando o usuário envia o formulário de login.
   * Emite os dados do formulário no formato `User`.
   */
  public loginEmit = output<User>();

  /**
   * Evento emitido quando o usuário envia o formulário de registro.
   * Emite os dados do formulário no formato `User`.
   */
  public registernEmit = output<User>();

  /**
   * Referência ao componente de formulário de autenticação.
   * Utilizado para acessar os dados preenchidos pelo usuário.
   */
  @ViewChild(AuthenticationFormComponent)
  authenticationFormComponent!: AuthenticationFormComponent;

  /**
   * Método chamado ao clicar no botão de ação.
   * Emite os dados do formulário para o componente pai conforme o tipo de operação.
   */
  submitAuth() {
    const dataForm = this.authenticationFormComponent.formUser.value;
    if (this.authenticationFormComponent.formUser.valid) {
      if (this.type() === 'login') {
        this.loginEmit.emit(dataForm);
      } else {
        this.registernEmit.emit(dataForm);
      }
    } else {
      this.authenticationFormComponent.formUser.markAllAsTouched();
    }
  }
}
