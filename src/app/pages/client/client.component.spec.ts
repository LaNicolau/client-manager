import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComponent } from './client.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientService } from '../../services/client/client.service';
import { LoadingService } from '../../services/loading/loading.service';
import { provideHttpClient } from '@angular/common/http';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientComponent, MatDialogModule],
      providers: [ClientService, LoadingService, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
