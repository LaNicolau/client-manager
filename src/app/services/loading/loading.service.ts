import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /**
   * Signal que indica se o sistema está em estado de loading.
   */
  hasLoading = signal<boolean>(false);

  /**
   * Atualiza o estado de loading.
   * @param {boolean} value - Valor que representa o novo estado de carregamento.
   */
  setLoading(value: boolean) {
    this.hasLoading.set(value);
  }
}
