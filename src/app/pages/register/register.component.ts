import { Component, inject, ViewChild } from '@angular/core';
import { AccessUserService } from '../../services/access-user/access-user.service';
import { Router } from '@angular/router';
import { AuthWrapperComponent } from '../../shared/components/wrapper/auth-wrapper/auth-wrapper.component';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  imports: [AuthWrapperComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private _router = inject(Router);
  private _accessUser = inject(AccessUserService);

  /**
   * Realiza o cadastro do usuário com os dados recebidos do formulário.
   * Após o sucesso, exibe uma mensagem e redireciona para a página inicial.
   * @param data - Objeto contendo os dados do usuário, como `email` e `password`.
   */
  register(data: User) {
    this._accessUser.post(data).subscribe({
      next: () => {
        alert('Usuário cadastrado'), this._router.navigate(['']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Email já cadastrado');
        } else {
          alert('Erro inesperado');
        }
      },
    });
  }
}
