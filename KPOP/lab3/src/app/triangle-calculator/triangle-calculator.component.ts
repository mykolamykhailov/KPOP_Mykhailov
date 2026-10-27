import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-triangle-calculator',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  template: `
    <h2>Периметр і площа прямокутного трикутника</h2>
    <label>Катет a: <input type="number" [(ngModel)]="a" (ngModelChange)="clear()" /></label>
    <label>Катет b: <input type="number" [(ngModel)]="b" (ngModelChange)="clear()" /></label>
    <button (click)="calculate()">Обчислити</button>
    @if (error) {
      <p class="error">{{ error }}</p>
    }
    @if (hypotenuse !== null && perimeter !== null && area !== null) {
      <p>Гіпотенуза: {{ hypotenuse | number: '1.0-4' }}</p>
      <p>Периметр: {{ perimeter | number: '1.0-4' }}</p>
      <p>Площа: {{ area | number: '1.0-4' }}</p>
    }
  `,
})
export class TriangleCalculatorComponent {
  a: number | null = null;
  b: number | null = null;
  hypotenuse: number | null = null;
  perimeter: number | null = null;
  area: number | null = null;
  error = '';

  clear(): void {
    this.hypotenuse = null;
    this.perimeter = null;
    this.area = null;
    this.error = '';
  }

  calculate(): void {
    this.clear();

    if (
      this.a === null ||
      this.b === null ||
      !Number.isFinite(this.a) ||
      !Number.isFinite(this.b) ||
      this.a <= 0 ||
      this.b <= 0
    ) {
      this.error = 'Введіть два додатні числа.';
      return;
    }

    const c = Math.hypot(this.a, this.b);
    const p = this.a + this.b + c;
    const s = (this.a * this.b) / 2;

    if (![c, p, s].every(Number.isFinite)) {
      this.error = 'Занадто великі значення.';
      return;
    }

    this.hypotenuse = c;
    this.perimeter = p;
    this.area = s;
  }
}
