import { Component, inject, ViewChild } from '@angular/core';
import { AuthenticationFormComponent } from '../../components/forms/authentication-form/authentication-form.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [AuthenticationFormComponent, RouterLink, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _auth = inject(AuthService);
  private _router = inject(Router);

  @ViewChild(AuthenticationFormComponent)
  authenticationFormComponent!: AuthenticationFormComponent;

  login() {
    const data = this.authenticationFormComponent.formUser.value;

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
