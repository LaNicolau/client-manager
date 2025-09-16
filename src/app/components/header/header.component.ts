import { Component, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _auth = inject(AuthService);

  /**
   * Signaç que representa se o usuário está logado.
   * Atualiza automaticamente com base no estado reativo do `AuthService`.
   */
  public userLogged = computed(() => this._auth.isLogged());

  /**
   * Realiza o logout do usuário.
   */
  logout() {
    this._auth.logout();
  }
}
