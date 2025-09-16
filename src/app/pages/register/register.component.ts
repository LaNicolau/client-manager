import { Component, inject, ViewChild } from '@angular/core';
import { AuthenticationFormComponent } from '../../components/forms/authentication-form/authentication-form.component';
import { AccessUserService } from '../../services/access-user/access-user.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [AuthenticationFormComponent, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private _router = inject(Router);
  private _accessUser = inject(AccessUserService);

  @ViewChild(AuthenticationFormComponent)
  authenticationFormComponent!: AuthenticationFormComponent;

  register() {
    const data = this.authenticationFormComponent.formUser.value;
    this._accessUser.post(data).subscribe(() => {
      alert('Usuário cadastrado'),
      this._router.navigate(['']);
    });
  }
}
