import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve setar o valor do signal hasLoading através do método setLoading', () => {
    service.setLoading(true);
    expect(service.hasLoading()).toBe(true);
  });
});
