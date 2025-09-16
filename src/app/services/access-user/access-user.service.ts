import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AccessUserService {
  private http = inject(HttpClient);
  private API_URL = environment.API_URL;

  /**
   * Envia os dados do usuário para a API de registro.
   * @param {User} data - Objeto contendo os dados do usuário a ser registrado.
   * @returns {Observable<User>} Observable que emite o usuário registrado como resposta da API.
   */
  post = (data: User): Observable<User> => {
    return this.http.post<User>(`${this.API_URL}/user/register`, data);
  };
}
