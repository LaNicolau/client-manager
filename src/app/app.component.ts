import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingSpinnerComponentComponent } from './shared/components/loading-spinner-component/loading-spinner-component.component';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingSpinnerComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _loading = inject(LoadingService);
  /**
   * Signal que indica se o sistema está em estado de loading.
   */
  hasLoading = computed(() => this._loading.hasLoading());
}
