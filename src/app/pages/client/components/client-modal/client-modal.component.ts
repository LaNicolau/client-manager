import { Component, Inject, inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../../../../services/client/client.service';
import { Dialog } from '@angular/cdk/dialog';
import { Client } from '../../../../interfaces/client.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-modal',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    ClientFormComponent,
  ],
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.scss',
})
export class ClientModalComponent {
  private _client = inject(ClientService);
  private _dialog = inject(Dialog);

  /**
   * Referência ao componente de formulário de cliente dentro do modal.
   */
  @ViewChild(ClientFormComponent) clientFormComponent!: ClientFormComponent;

  /**
   * Injeta os dados recebidos pelo modal, contendo o cliente e o modo de operação.
   * @param {{ dataClient: Client; mode: string }} data - Dados passados para o modal.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dataClient: Client; mode: string }
  ) {}

  /**
   * Salva os dados do formulário de cliente.
   * Este método verifica se o formulário é válido e, com base no modo (`ADD` ou `EDIT`),
   * realiza a chamada apropriada para criar ou atualizar o cliente.
   * - Se o modo for `'ADD'`, envia os dados via `POST` e trata o erro 409 como CPF duplicado.
   * - Se o modo for `'EDIT'`, envia os dados via `PUT` com o ID do cliente.
   *
   * @returns {void}
   */
  saveForm() {
    const form = this.clientFormComponent.formClient;

    if (form.valid) {
      if (this.data.mode === 'ADD') {
        this._client.post(form.value).subscribe({
          next: () => {
            alert('Cadastrado com sucesso');
            this._dialog.closeAll();
          },
          error: (err) => {
            if (err.status === 409) {
              alert('Cpf já cadastrado');
            } else {
              alert('Erro inesperado');
            }
          },
        });
      } else {
        this._client.put(this.data.dataClient.id, form.value).subscribe(() => {
          alert('Atualizado com sucesso');
          this._dialog.closeAll();
        });
      }
    } else {
      form.markAllAsTouched();
    }
  }

  /**
   * Fecha o formulário.
   * Se houver alterações não salvas, solicita confirmação do usuário antes de fechar.
   * Caso contrário, fecha o modal diretamente.
   */
  closeForm() {
    if (this.clientFormComponent.formClient.dirty) {
      if (confirm('Sair sem salvar mudanças?')) this._dialog.closeAll();
    } else {
      this._dialog.closeAll();
    }
  }
}
