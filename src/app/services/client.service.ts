import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private API_URL = environment.API_URL;
  /**
   * Recupera todos os clientes da API.
   * @returns {Observable<Array<Client>>} Um Observable contendo uma lista de clientes.
   */
  getAll = (): Observable<Array<Client>> => {
    return this.http.get<Array<Client>>(this.API_URL);
  };
  /**
   * Cria um novo cliente na API.
   * @param {Client} data - Os dados do cliente a serem enviados.
   * @returns {Observable<Client>} Um Observable contendo o cliente criado.
   */
  post = (data: Client): Observable<Client> => {
    return this.http.post<Client>(this.API_URL, data);
  };
  /**
   * Atualiza os dados de um cliente existente.
   * @param {number} id - O ID do cliente a ser atualizado.
   * @param {Client} data - Os novos dados do cliente.
   * @returns {Observable<Client>} Um Observable contendo o cliente atualizado.
   */
  put = (id: number, data: Client): Observable<Client> => {
    return this.http.put<Client>(`${this.API_URL}/${id}`, data);
  };
  /**
   * Exclui um cliente da API.
   * @param {number} id - O ID do cliente a ser excluído.
   * @returns {Observable<Client>} Um Observable contendo os dados do cliente excluído.
   */
  delete = (id: number): Observable<Client> => {
    return this.http.delete<Client>(`${this.API_URL}/${id}`);
  };
}
