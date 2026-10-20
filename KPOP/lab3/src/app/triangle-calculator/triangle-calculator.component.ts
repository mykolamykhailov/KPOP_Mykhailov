import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TriangleResult {
  hypotenuse: number;
  perimeter: number;
  area: number;
}

@Component({
  selector: 'app-triangle-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="card">
      <div class="section-label">Варіант 6</div>
      <h2>Калькулятор прямокутного трикутника</h2>

      <p class="description">
        Введіть довжини двох катетів для обчислення гіпотенузи, периметра та площі.
      </p>

      <form (ngSubmit)="calculate()" class="form">
        <div class="input-grid">
          <label>
            Катет a
            <input
              type="number"
              name="legA"
              step="any"
              min="0"
              [(ngModel)]="legA"
              (ngModelChange)="clearResult()"
              placeholder="Наприклад, 3"
            />
          </label>

          <label>
            Катет b
            <input
              type="number"
              name="legB"
              step="any"
              min="0"
              [(ngModel)]="legB"
              (ngModelChange)="clearResult()"
              placeholder="Наприклад, 4"
            />
          </label>
        </div>

        <button type="submit">Обчислити</button>
      </form>

      @if (errorMessage) {
        <p class="error" role="alert">{{ errorMessage }}</p>
      }

      @if (result; as r) {
        <div class="results" aria-live="polite">
          <h3>Результати обчислення</h3>

          <div class="result-grid">
            <div class="result-item">
              <span>Гіпотенуза</span>
              <strong>{{ r.hypotenuse | number: '1.0-4' }}</strong>
            </div>

            <div class="result-item">
              <span>Периметр</span>
              <strong>{{ r.perimeter | number: '1.0-4' }}</strong>
            </div>

            <div class="result-item">
              <span>Площа</span>
              <strong>{{ r.area | number: '1.0-4' }}</strong>
            </div>
          </div>

          <div class="formulas">
            <p>c = √(a² + b²)</p>
            <p>P = a + b + c</p>
            <p>S = (a × b) / 2</p>
          </div>
        </div>
      }
    </section>
  `,
})
export class TriangleCalculatorComponent {
  legA: number | null = null;
  legB: number | null = null;

  result: TriangleResult | null = null;
  errorMessage: string = '';

  calculate(): void {
    this.clearResult();

    const a: number | null = this.legA;
    const b: number | null = this.legB;

    if (
      a === null ||
      b === null ||
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      a <= 0 ||
      b <= 0
    ) {
      this.errorMessage = 'Введіть два додатні числа для довжин катетів.';
      return;
    }

    const hypotenuse: number = Math.hypot(a, b);
    const perimeter: number = a + b + hypotenuse;
    const area: number = (a * b) / 2;

    if (!Number.isFinite(hypotenuse) || !Number.isFinite(perimeter) || !Number.isFinite(area)) {
      this.errorMessage = 'Занадто великі значення катетів.';
      return;
    }

    this.result = {
      hypotenuse,
      perimeter,
      area,
    };
  }

  clearResult(): void {
    this.result = null;
    this.errorMessage = '';
  }
}
