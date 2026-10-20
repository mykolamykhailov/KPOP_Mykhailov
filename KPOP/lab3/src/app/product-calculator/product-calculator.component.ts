import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="card">
      <div class="section-label">Завдання 3.4</div>
      <h2>Калькулятор вартості товару</h2>

      <p class="description">Введіть ціну товару та його кількість.</p>

      <div class="input-grid">
        <label>
          Ціна товару
          <input type="number" min="0" step="any" [(ngModel)]="price" placeholder="Введіть ціну" />
        </label>

        <label>
          Кількість
          <input
            type="number"
            min="1"
            step="1"
            [(ngModel)]="quantity"
            placeholder="Введіть кількість"
          />
        </label>
      </div>

      @if (isValid) {
        <div class="results">
          <p>Загальна вартість:</p>
          <div class="total-price">{{ total | number: '1.2-2' }} грн</div>
        </div>
      } @else {
        <p class="hint">Введіть невід'ємну ціну та додатну цілу кількість.</p>
      }
    </section>
  `,
})
export class ProductCalculatorComponent {
  price: number | null = null;
  quantity: number | null = 1;

  get isValid(): boolean {
    return (
      this.price !== null &&
      this.quantity !== null &&
      Number.isFinite(this.price) &&
      Number.isInteger(this.quantity) &&
      this.price >= 0 &&
      this.quantity > 0
    );
  }

  get total(): number {
    if (!this.isValid) {
      return 0;
    }

    return this.price! * this.quantity!;
  }
}
