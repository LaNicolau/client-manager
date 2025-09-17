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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthWrapperComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'titulo');
    fixture.componentRef.setInput('type', 'login');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitAuth', () => {
    it('deve emitir o loginEmit se o form for válido e o type == login', () => {
      component.authenticationFormComponent.formUser.setValue({
        email: 'teste@gmail.com',
        password: '123456',
      });
      spyOn(component.loginEmit, 'emit');
      spyOn(component.registernEmit, 'emit');

      component.submitAuth();

      expect(component.loginEmit.emit).toHaveBeenCalledWith({
        email: 'teste@gmail.com',
        password: '123456',
      });
      expect(component.registernEmit.emit).not.toHaveBeenCalled();
    });

    it('deve emitir o registernEmit se o form for válido e o type == register', () => {
      component.authenticationFormComponent.formUser.setValue({
        email: 'teste@gmail.com',
        password: '123456',
      });
      fixture.componentRef.setInput('type', 'register');
      spyOn(component.loginEmit, 'emit');
      spyOn(component.registernEmit, 'emit');
      fixture.detectChanges();
      component.submitAuth();

      expect(component.registernEmit.emit).toHaveBeenCalledWith({
        email: 'teste@gmail.com',
        password: '123456',
      });
      expect(component.loginEmit.emit).not.toHaveBeenCalled();
    });

    it('deve marcar todos os campos como tocados se o form for inválido', () => {
      component.authenticationFormComponent.formUser.setValue({
        email: 'teste',
        password: '123456',
      });

      fixture.detectChanges();
      component.submitAuth();

      expect(component.authenticationFormComponent.formUser.touched).toBe(true);
    });
  });
});
