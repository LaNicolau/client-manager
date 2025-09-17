import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComponent } from './client.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ClientService } from '../../services/client/client.service';
import { LoadingService } from '../../services/loading/loading.service';
import { provideHttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { Client } from '../../interfaces/client.interface';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormattedCpfPipe } from '../../pipes/formatted-cpf/formatted-cpf.pipe';
import { FormattedPhonePipe } from '../../pipes/formatted-phone/formatted-phone.pipe';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let mockClients: Client = {
    id: 1,
    name: 'João',
    email: '',
    cpf: '',
    telefone: '',
  };

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', [
      'getAll',
      'delete',
    ]);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setLoading']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    clientServiceSpy.getAll.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        ClientComponent,
        MatDialogModule,
        DatePipe,
        FormattedCpfPipe,
        FormattedPhonePipe,
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve chamar o getClients', () => {
      spyOn(component, 'getClients');

      component.ngOnInit();

      expect(component.getClients).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('deve completar o destroy$ no ngOnDestroy', () => {
      const destroy$ = component['_destroy$'] as Subject<void>;
      const completeSpy = spyOn(destroy$, 'complete').and.callThrough();

      component.ngOnDestroy();

      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('getClients', () => {
    it('deve buscar clientes e atualizar dataSource', () => {
      clientServiceSpy.getAll.and.returnValue(of([mockClients]));

      component.getClients();

      expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(true);
      expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(false);
      expect(component.dataSource.data).toEqual([mockClients]);
    });
  });

  describe('delete', () => {
    it('deve deletar o clietne a partir do id', () => {
      spyOn(window, 'alert');
      spyOn(component, 'getClients');
      clientServiceSpy.delete.and.returnValue(of(mockClients));

      component.deleteClient(1);

      expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(false);
      expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(true);
      expect(window.alert).toHaveBeenCalledWith('Excluído com sucesso');
      expect(component.getClients).toHaveBeenCalled();
    });
  });

  describe('openDialog', () => {
    it('deve abrir a modal e buscar os cliente após o fechmamento se receber true no afterClosed', () => {
      const afterClosed$ = of(true);
      dialogSpy.open.and.returnValue({
        afterClosed: () => afterClosed$,
      } as MatDialogRef<any>);
      spyOn(component, 'getClients');

      component.openDialog();

      expect(dialogSpy.open).toHaveBeenCalled();
      expect(component.getClients).toHaveBeenCalled();
    });

    it('deve abrir a modal e não fará mais nada se receber false no afterClosed', () => {
      const afterClosed$ = of(false);
      dialogSpy.open.and.returnValue({
        afterClosed: () => afterClosed$,
      } as MatDialogRef<any>);
      spyOn(component, 'getClients');

      component.openDialog();

      expect(dialogSpy.open).toHaveBeenCalled();
      expect(component.getClients).not.toHaveBeenCalled();
    });
  });
});
