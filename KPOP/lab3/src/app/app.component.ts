import { Component } from '@angular/core';

import { TriangleCalculatorComponent } from './triangle-calculator/triangle-calculator.component';
import { ProductCalculatorComponent } from './product-calculator/product-calculator.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TriangleCalculatorComponent, ProductCalculatorComponent, ProductListComponent],
  template: `
    <main class="page">
      <header class="page-header">
        <div class="section-label">Angular 20 + TypeScript</div>
        <h1>Практична робота №3</h1>
        <p>Знайомство з Angular. Індивідуальний варіант №6.</p>
      </header>

      <app-triangle-calculator></app-triangle-calculator>

      <div class="examples-heading">
        <h2>Додаткові компоненти</h2>
        <p>Демонстрація роботи з Angular Forms та компонентами.</p>
      </div>

      <div class="examples-grid">
        <app-product-calculator></app-product-calculator>
        <app-product-list></app-product-list>
      </div>

      <footer class="footer">Практична робота №3 • Angular • Варіант 6</footer>
    </main>
  `,
})
export class AppComponent {}
