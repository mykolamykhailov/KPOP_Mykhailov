import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="card">
      <div class="section-label">Завдання 3.5</div>
      <h2>Список товарів</h2>

      <p class="description">Додавайте товари, указуйте їхню ціну та видаляйте зі списку.</p>

      <form (ngSubmit)="addProduct()" class="form">
        <div class="input-grid">
          <label>
            Назва товару
            <input
              type="text"
              name="newName"
              [(ngModel)]="newName"
              placeholder="Наприклад, Ноутбук"
            />
          </label>

          <label>
            Ціна
            <input
              type="number"
              name="newPrice"
              min="0"
              step="any"
              [(ngModel)]="newPrice"
              placeholder="Введіть ціну"
            />
          </label>
        </div>

        <button type="submit">Додати товар</button>
      </form>

      @if (errorMessage) {
        <p class="error" role="alert">{{ errorMessage }}</p>
      }

      @if (products.length > 0) {
        <div class="product-list">
          @for (product of products; track product.id) {
            <div class="product-row">
              <span>{{ product.name }}</span>
              <strong> {{ product.price | number: '1.2-2' }} грн </strong>
              <button type="button" class="delete-button" (click)="removeProduct(product.id)">
                Видалити
              </button>
            </div>
          }
        </div>

        <div class="list-total">
          Загальна сума:
          <strong>{{ total | number: '1.2-2' }} грн</strong>
        </div>
      } @else {
        <p class="hint">Список товарів поки порожній.</p>
      }
    </section>
  `,
})
export class ProductListComponent {
  newName: string = '';
  newPrice: number | null = null;

  products: Product[] = [];
  errorMessage: string = '';

  private nextId: number = 1;

  addProduct(): void {
    const name: string = this.newName.trim();
    const price: number | null = this.newPrice;

    if (name === '' || price === null || !Number.isFinite(price) || price <= 0) {
      this.errorMessage = 'Введіть назву та додатну ціну товару.';
      return;
    }

    this.products.push({
      id: this.nextId++,
      name,
      price,
    });

    this.newName = '';
    this.newPrice = null;
    this.errorMessage = '';
  }

  removeProduct(id: number): void {
    this.products = this.products.filter((product: Product): boolean => product.id !== id);
  }

  get total(): number {
    return this.products.reduce((sum: number, product: Product): number => sum + product.price, 0);
  }
}
