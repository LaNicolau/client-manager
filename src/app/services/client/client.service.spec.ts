import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, provideHttpClient()],
    });
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
