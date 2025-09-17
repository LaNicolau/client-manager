import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormComponent } from './client-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;
  let client = {
    name: '',
    email: '',
    cpf: '',
    telefone: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientFormComponent,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        NgxMaskDirective,
      ],
      providers: [provideNgxMask(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientFormComponent);
    fixture.componentRef.setInput('mode', 'EDIT');
    fixture.componentRef.setInput('dataClient', {
      name: 'João',
      email: 'joao@email.com',
      cpf: '12345678901',
      telefone: '11999999999',
    });
    component = fixture.componentInstance;
    component.formClient.setValue(client);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('deve desabilitar o campo de cpf se o mode == EDIT', () => {
      expect(component.formClient.get('cpf')?.disabled).toBeTrue();
    });

    it('deve habilitar o campo de cpf se o mode == ADD', () => {
      fixture.componentRef.setInput('mode', 'ADD');
      fixture.detectChanges();

      expect(component.formClient.get('cpf')?.enabled).toBeTrue();
    });
  });

  describe('ngOnInit', () => {
    it('deve chamar o patchValue se houver dados de cliente', () => {
      spyOn(component, 'patchValue');

      component.ngOnInit();

      expect(component.patchValue).toHaveBeenCalled();
    });

    it('não deve chamar o patchValue se não houver dados de cliente', () => {
      fixture.componentRef.setInput('dataClient', null);
      spyOn(component, 'patchValue');
      fixture.detectChanges();

      component.ngOnInit();

      expect(component.patchValue).not.toHaveBeenCalled();
    });
  });

  describe('patchValue', () => {
    it('deve chamar o patchValue se houver dados de cliente', () => {
      component.patchValue();

      expect(component.formClient.getRawValue()).toEqual({
        name: 'João',
        email: 'joao@email.com',
        cpf: '12345678901',
        telefone: '11999999999',
      });
    });
  });
});
