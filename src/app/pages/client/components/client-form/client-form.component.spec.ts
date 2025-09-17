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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
