import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Guard que impede o acesso à rota de login caso o usuário já esteja autenticado.
 * Se o usuário estiver logado, redireciona para a rota '/client'.
 * Caso contrário, permite o acesso à rota normalmente.
 *
 */
export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLogged()) {
    return router.parseUrl('/client');
  }
  return true;
};
