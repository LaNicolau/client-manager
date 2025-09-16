import {
  Component,
  effect,
  inject,
  input,
  OnChanges,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Client } from '../../../../interfaces/client.interface';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ClientService } from '../../../../services/client/client.service';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-client-form',
  imports: [
    MatFormField,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class ClientFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _client = inject(ClientService);

  /**
   * Dados de um cliente ou null.
   * @type {Client | null}
   */
  public dataClient = input<Client | null>(null);

  /**
   * Modo do formulário
   */
  public mode = input<string>('');

  /**
   * Formulário para cadastro ou edição de cliente.
   */
  formClient: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cpf: [
      '',
      [Validators.required, Validators.pattern(/^\d{11}$/)],
    ],
    telefone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
  });

  /**
   * Se o mode do formulário for EDIT desabilita o input do cpf
   */
  constructor() {
    effect(() => {
      this.mode() === 'EDIT'
        ? this.formClient.get('cpf')?.disable()
        : this.formClient.get('cpf')?.enable();
    });
  }

  /**
   * Se houver dados de cliente, preenche o formulário com esses dados.
   */
  ngOnInit() {
    if (this.dataClient()) this.patchValue();
  }

  /**
   * Preenche o formulário com os dados do cliente recebidos via input.
   */
  patchValue() {
    this.formClient.patchValue(this.dataClient()!);
  }
}
