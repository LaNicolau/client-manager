import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

/**
 * Guard de autenticação que protege rotas restritas.
 * Verifica se o usuário está autenticado
 * - Se estiver logado, permite o acesso à rota.
 * - Se não estiver logado, redireciona para a rota raiz `'/'`.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    return true;
  }
  return router.parseUrl('/');
};
