import { TestBed } from '@angular/core/testing';

import { AccessUserService } from './access-user.service';

describe('AccessUserService', () => {
  let service: AccessUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
