import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { authGuard } from './auth.guard';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

describe('authGuard', () => {
  let router: Router;
  let authService: AuthService;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('authGuard', () => {
    it('Deve redirecionar para a raiz se não estiver estiver logado', () => {
      authService.isLogged.set(false);
      spyOn(router, 'parseUrl');
      TestBed.runInInjectionContext(() => authGuard(null as any, null as any));

      expect(router.parseUrl).toHaveBeenCalledWith('/');
    });

    it('Deve retornar true se estiver logado', () => {
      authService.isLogged.set(true);
      const result = TestBed.runInInjectionContext(() =>
        authGuard(null as any, null as any)
      );

      expect(result).toBe(true);
    });
  });
});
