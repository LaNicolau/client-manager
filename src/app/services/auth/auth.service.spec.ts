import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, provideHttpClient(), Router]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

