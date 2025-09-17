import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('http', () => {
    const data = {
      id: 0,
      name: 'Ana',
      email: 'teste@gmail.com',
      cpf: '12345678911',
      telefone: '11111111111',
    };

    it('getAll', () => {
      service.getAll().subscribe(() => {});

      const req = httpMock.expectOne(`${environment.API_URL}/client`);
      expect(req.request.method).toBe('GET');
    });

    it('post', () => {
      service.post(data).subscribe((response) => {
        expect(response).toEqual(data);
      });

      const req = httpMock.expectOne(`${environment.API_URL}/client`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(data);

      req.flush(data);
    });

    it('put', () => {
      service.put(0, data).subscribe((response) => {
        expect(response).toEqual(data);
      });

      const req = httpMock.expectOne(`${environment.API_URL}/client/0`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(data);

      req.flush(data);
    });
  });

  it('delete', () => {
    service.delete(0).subscribe(() => {});

    const req = httpMock.expectOne(`${environment.API_URL}/client/0`);
    expect(req.request.method).toBe('DELETE');
  });
});
