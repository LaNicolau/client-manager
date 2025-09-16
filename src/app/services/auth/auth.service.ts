import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Client } from '../../interfaces/client.interface';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private API_URL = environment.API_URL;
  /**
   * Signal que representa o estado de autenticação do usuário.
   * `true` se o token estiver presente no localStorage, `false` caso contrário.
   */
  public isLogged = signal<boolean>(!!localStorage.getItem('token'));

  /**
   * Realiza o login do usuário enviando os dados para a API.
   * Ao receber o token, salva no localStorage e atualiza o sinal `isLogged`.
   * @param {User} data - Dados do usuário (email, senha, etc.).
   * @returns {Observable<{ access_token: string }>} Observable com o token de acesso.
   */
  post = (data: User): Observable<{ access_token: string }> => {
    return this.http
      .post<{ access_token: string }>(`${this.API_URL}/auth/login`, data)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.access_token);
          this.isLogged.set(true);
        })
      );
  };

  /**
   * Recupera o token de autenticação armazenado no localStorage.
   * @returns {string | null} Token de acesso, ou `null` se não estiver presente.
   */
  getToken(): string | null {
    return window.localStorage.getItem('token');
  }

  /**
   * Realiza o logout do usuário.
   * Remove o token do localStorage, atualiza o signal `isLogged` e redireciona para a rota raiz.
   */
  logout() {
    window.localStorage.removeItem('token');
    this.isLogged.set(false);
    this.router.navigate(['/']);
  }
}
