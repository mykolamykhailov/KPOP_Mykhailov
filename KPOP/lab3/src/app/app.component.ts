import { Component } from '@angular/core';
import { TriangleCalculatorComponent } from './triangle-calculator/triangle-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TriangleCalculatorComponent],
  template: `
    <main>
      <h1>Практична робота №3</h1>
      <p>Варіант 6: прямокутний трикутник</p>
      <app-triangle-calculator></app-triangle-calculator>
    </main>
  `,
})
export class AppComponent {}
