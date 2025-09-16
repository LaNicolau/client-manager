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
   * Salva os dados do formulário.
   * Se o formulário for válido, realiza a operação de cadastro ou atualização
   * conforme o modo definido ('ADD' ou outro).
   * Exibe alertas de sucesso e fecha o modal após a operação.
   * Caso o formulário seja inválido, marca todos os campos como tocados.
   */
  saveForm() {
    const data = this.clientFormComponent.formClient.value;

    if (this.clientFormComponent.formClient.valid) {
      if (this.data.mode === 'ADD') {
        this._client.post(data).subscribe(() => {
          alert('Cadastrado com sucesso');
          this._dialog.closeAll();
        });
      } else {
        this._client.put(this.data.dataClient.id, data).subscribe(() => {
          alert('Atualizado com sucesso');
          this._dialog.closeAll();
        });
      }
    } else {
      this.clientFormComponent.formClient.markAllAsTouched();
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
