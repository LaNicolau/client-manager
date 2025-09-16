import { User } from './../../interfaces/user.interface';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthWrapperComponent } from '../../shared/components/wrapper/auth-wrapper/auth-wrapper.component';

@Component({
  selector: 'app-login',
  imports: [AuthWrapperComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _auth = inject(AuthService);
  private _router = inject(Router);

  /**
   * Realiza o login do usuário com os dados recebidos do formulário.
   * Em caso de sucesso, redireciona para a rota `/client`.
   * Em caso de erro, exibe mensagens específicas conforme o status HTTP.
   * @param data - Objeto contendo `email` e `password` do usuário.
   */
  login(data: User) {
    this._auth.post(data).subscribe({
      next: () => this._router.navigate(['/client']),
      error: (err) => {
        if (err.status === 404) {
          alert('Usuário não encontrado');
        } else if (err.status === 401) {
          alert('Senha incorreta');
        } else {
          alert('Erro inesperado');
        }
      },
    });
  }
}
