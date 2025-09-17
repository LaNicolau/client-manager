import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner-component',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-spinner-component.component.html',
  styleUrl: './loading-spinner-component.component.scss',
})
export class LoadingSpinnerComponentComponent {}
