import { Component, Inject, inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../../../../services/client/client.service';
import { Client } from '../../../../interfaces/client.interface';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService } from '../../../../services/loading/loading.service';
import { finalize } from 'rxjs';

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
  private _loading = inject(LoadingService);

  /**
   * Referência ao componente de formulário de cliente dentro do modal.
   */
  @ViewChild(ClientFormComponent) clientFormComponent!: ClientFormComponent;

  /**
   * Injeta os dados recebidos pelo modal, contendo o cliente e o modo de operação.
   * @param {{ dataClient: Client; mode: string }} data - Dados passados para o modal.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dataClient: Client; mode: string },
    private _dialogRef: MatDialogRef<ClientModalComponent>
  ) {}

  /**
   * Salva os dados do formulário de cliente.
   * Verifica se o formulário é válido e, com base no modo de operação (`ADD` ou `EDIT`),
   * realiza a chamada apropriada para criar ou atualizar o cliente.
   * - Modo `'ADD'`: envia os dados via `POST` e trata o erro 409 como CPF duplicado.
   * - Modo `'EDIT'`: envia os dados via `PUT` com o ID do cliente.
   * Exibe mensagens de sucesso ou erro e fecha o modal após operação bem-sucedida.
   */
  saveForm() {
    const form = this.clientFormComponent.formClient;

    if (form.valid) {
      this._loading.setLoading(true);
      if (this.data.mode === 'ADD') {
        this._client
          .post(form.value)
          .pipe(finalize(() => this._loading.setLoading(false)))
          .subscribe({
            next: () => {
              alert('Cadastrado com sucesso');
              this._dialogRef.close(true);
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
          this._loading.setLoading(false);
          alert('Atualizado com sucesso');
          this._dialogRef.close(true);
        });
      }
    } else {
      form.markAllAsTouched();
    }
  }

  /**
   * Fecha o formulário de cliente.
   * Se houver alterações não salvas, solicita confirmação do usuário antes de fechar.
   * Caso contrário, fecha o modal diretamente.
   */
  closeForm() {
    if (this.clientFormComponent.formClient.dirty) {
      if (confirm('Sair sem salvar mudanças?')) this._dialogRef.close(false);
    } else {
      this._dialogRef.close(false);
    }
  }
}
