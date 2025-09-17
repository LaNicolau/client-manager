import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Route, Router } from '@angular/router';
import { loginGuard } from './login.guard';
import { AuthService } from '../../services/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';

describe('loginGuard', () => {
  let router: Router;
  let authService: AuthService;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

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

  describe('loginGuard', () => {
    it('Deve retornar true se nâo estiver logado', () => {
      authService.isLogged.set(false);
      const result = TestBed.runInInjectionContext(() =>
        loginGuard(null as any, null as any)
      );

      expect(result).toBe(true);
    });

    it('Deve redirecionar para a rota client se estiver logado', () => {
      authService.isLogged.set(true);
      spyOn(router, 'parseUrl');
      TestBed.runInInjectionContext(() => loginGuard(null as any, null as any));

      expect(router.parseUrl).toHaveBeenCalledWith('/client');
    });
  });
});
