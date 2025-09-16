import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor HTTP responsável por adicionar o token de autenticação nas requisições
 * e tratar erros de autenticação.
 * - Se o usuário estiver logado, adiciona o cabeçalho `Authorization` com o token JWT.
 * - Se a resposta da API for 401 (Unauthorized), realiza o logout automaticamente.
 * @returns {Observable<HttpEvent<any>>} Requisição modificada (se aplicável) ou erro tratado.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.isLogged()) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${authService.getToken()}` },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
