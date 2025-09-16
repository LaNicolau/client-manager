import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { Client } from '../../interfaces/client.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ClientModalComponent } from './components/client-modal/client-modal.component';
import { DatePipe } from '@angular/common';
import { FormattedCpfPipe } from '../../pipes/formatted-cpf/formatted-cpf.pipe';
import { FormattedPhonePipe } from '../../pipes/formatted-phone/formatted-phone.pipe';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-client',
  imports: [
    MatIcon,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    DatePipe,
    FormattedCpfPipe,
    FormattedPhonePipe,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit, OnDestroy {
  private _client = inject(ClientService);
  private _dialog = inject(MatDialog);

  /**
   * Colunas exibidas na tabela de clientes.
   * @type {string[]}
   */
  displayedColumns: string[] = [
    'nome',
    'email',
    'cpf',
    'telefone',
    'data',
    'editar',
  ];

  /**
   * Fonte de dados da tabela, baseada na lista de clientes.
   * @type {MatTableDataSource<Client>}
   */
  dataSource!: MatTableDataSource<Client>;
  private _destroy$ = new Subject<void>();

  /**
   * Inicializa a tabela carregando os clientes.
   */
  ngOnInit() {
    this.getClients();
  }

  /**
   * Encerra todas as subscriptions ativas para evitar vazamentos de memória.
   */
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Busca todos os clientes da API e atualiza a fonte de dados da tabela.
   */
  getClients() {
    this._client
      .getAll()
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  /**
   * Exclui um cliente pelo ID e atualiza a lista após a exclusão.
   * @param {number} id - O ID do cliente a ser excluído.
   */
  deleteClient(id: number) {
    this._client
      .delete(id)
      .subscribe(() => {
        alert('Excluído com sucesso');
        this.getClients();
      });
  }

  /**
   * Abre o modal para adicionar ou editar um cliente.
   * Após o fechamento do modal, atualiza a lista de clientes.
   *
   * @param {Client} [dataClient] - Dados do cliente a serem editados (opcional).
   * @param {string} [mode='ADD'] - Modo de operação do modal ('ADD' ou 'EDIT').
   */
  openDialog(dataClient?: Client, mode: string = 'ADD') {
    this._dialog
      .open(ClientModalComponent, {
        data: { dataClient, mode },
        disableClose: true,
        width: '600px',
      })
      .afterClosed()
      .subscribe(() => this.getClients());
  }
}
