import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet, HeaderComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('deve retornar o valor inicial do computed', () => {
    expect(app.hasLoading()).toBe(false);
  });
});
