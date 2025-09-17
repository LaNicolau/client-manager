import { TestBed } from '@angular/core/testing';

import { AccessUserService } from './access-user.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('AccessUserService', () => {
  let service: AccessUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, provideHttpClient()],
    });
    service = TestBed.inject(AccessUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
