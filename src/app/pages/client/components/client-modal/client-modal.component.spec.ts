import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModalComponent } from './client-modal.component';
import { ClientService } from '../../../../services/client/client.service';
import { LoadingService } from '../../../../services/loading/loading.service';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('ClientModalComponent', () => {
  let component: ClientModalComponent;
  let fixture: ComponentFixture<ClientModalComponent>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ClientModalComponent>>;
  const clientData = {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    cpf: '12345678901',
    telefone: '11999999999',
  };

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', ['post', 'put']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setLoading']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ClientModalComponent, ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { dataClient: clientData, mode: 'ADD' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('saveForm', () => {
    it('deve chamar post e fechar modal com sucesso no modo ADD', () => {
      clientServiceSpy.post.and.returnValue(of(clientData));
      spyOn(window, 'alert');

      component.saveForm();

      expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(true);
      expect(window.alert).toHaveBeenCalledWith('Cadastrado com sucesso');
      expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
      expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(false);
    });

    it('deve mostrar alert de CPF duplicado no erro 409', () => {
      clientServiceSpy.post.and.returnValue(throwError({ status: 409 }));
      spyOn(window, 'alert');

      component.saveForm();

      expect(window.alert).toHaveBeenCalledWith('Cpf já cadastrado');
    });

    it('deve mostrar alert de erro inesperado para outros erros', () => {
      clientServiceSpy.post.and.returnValue(throwError({ status: 500 }));
      spyOn(window, 'alert');

      component.saveForm();

      expect(window.alert).toHaveBeenCalledWith('Erro inesperado');
    });
  });

  describe('closeModal', () => {
    it('deve fechar modal direto se form não estiver sujo', () => {
      spyOn(window, 'confirm');
      component.clientFormComponent.formClient.markAsPristine();

      component.closeModal();

      expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
      expect(window.confirm).not.toHaveBeenCalled();
    });

    it('deve perguntar confirm se form estiver sujo e fechar se confirmar', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      component.clientFormComponent.formClient.markAsDirty();

      component.closeModal();

      expect(window.confirm).toHaveBeenCalledWith('Sair sem salvar mudanças?');
      expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
    });

    it('não deve fechar modal se form estiver sujo e cancelar confirm', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      component.clientFormComponent.formClient.markAsDirty();

      component.closeModal();

      expect(window.confirm).toHaveBeenCalledWith('Sair sem salvar mudanças?');
      expect(dialogRefSpy.close).not.toHaveBeenCalled();
    });
  });
});
