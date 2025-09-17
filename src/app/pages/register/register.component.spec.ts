import { AuthWrapperComponent } from './../../shared/components/wrapper/auth-wrapper/auth-wrapper.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessUserService } from '../../services/access-user/access-user.service';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accessUserServiceSpy: jasmine.SpyObj<AccessUserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const accessUserMock = jasmine.createSpyObj('AccessUserService', ['post']);
    accessUserMock.post.and.returnValue(of({}));
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, AuthWrapperComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
            },
          },
        },
        AccessUserService,
        Router,
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    accessUserServiceSpy = TestBed.inject(
      AccessUserService
    ) as jasmine.SpyObj<AccessUserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
