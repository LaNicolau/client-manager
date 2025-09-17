import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        provideHttpClient(),
        Router,
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.setItem('token', 'teste');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('http', () => {
    it('post', () => {
      const data = { email: 'teste@gmail.com', password: '123' };
      const mockResponse = { access_token: '' };

      service.post(data).subscribe((response) => {
        expect(response.access_token).toBe('');
      });

      const req = httpMock.expectOne(`${environment.API_URL}/auth/login`);
      expect(req.request.method).toBe('POST');

      req.flush(mockResponse);

      expect(window.localStorage.getItem('token')).toBe('');
      expect(service.isLogged()).toBe(true);
    });
  });

  describe('getToken', () => {
    it('deve pegar o token de autenticação armazenado no localStorage.', () => {
      const result = service.getToken();

      expect(result).toBe('teste');
    });
  });

  describe('logout', () => {
    it('deve remove o token do localStorage, atualizar o signal isLogged e redirecionar para a rota raiz ao realizar logout', () => {
      spyOn(router, 'navigate');
      service.logout();

      expect(window.localStorage.getItem('token')).toBe(null);
      expect(service.isLogged()).toBe(false);
      expect(router.navigate).toHaveBeenCalledOnceWith(['/']);
    });
  });
});
