import { TestBed } from '@angular/core/testing';

import { AccessUserService } from './access-user.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('AccessUserService', () => {
  let service: AccessUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AccessUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('post', () => {
    const data = { email: 'teste@gmail.com', password: '123' };

    service.post(data).subscribe((response) => {
      expect(response).toEqual(data);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/user/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);

    req.flush(data);
  });
});
