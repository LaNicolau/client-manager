import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWrapperComponent } from './auth-wrapper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthenticationFormComponent } from '../../forms/authentication-form/authentication-form.component';

describe('AuthWrapperComponent', () => {
  let component: AuthWrapperComponent;
  let fixture: ComponentFixture<AuthWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthWrapperComponent,
        AuthenticationFormComponent,
        MatButtonModule,
        MatIcon,
        RouterLink,
      ],
      providers: [  {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
            },
          },
        },]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthWrapperComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'titulo')
    fixture.componentRef.setInput('type', 'login')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
