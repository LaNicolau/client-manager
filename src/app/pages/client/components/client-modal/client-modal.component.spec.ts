import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModalComponent } from './client-modal.component';
import { ClientService } from '../../../../services/client/client.service';
import { LoadingService } from '../../../../services/loading/loading.service';
import { provideHttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ClientFormComponent } from '../client-form/client-form.component';

describe('ClientModalComponent', () => {
  let component: ClientModalComponent;
  let fixture: ComponentFixture<ClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientModalComponent,
        MatDialogModule,
        MatButtonModule,
        ClientFormComponent,
      ],
      providers: [
        ClientService,
        LoadingService,
        provideHttpClient(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            dataClient: {},
            mode: 'ADD',
          },
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
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
});
