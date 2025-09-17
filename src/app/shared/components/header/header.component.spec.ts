import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideHttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../services/auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatIcon],
      providers: [provideHttpClient(), AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar a funçao de logout no authService', () => {
    spyOn(authService, 'logout');

    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
