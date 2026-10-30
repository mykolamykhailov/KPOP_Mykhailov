import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  @Input() text: string = '';

  get processedText(): string {
    return Array.from(this.text).reverse().join('').replace(/[аА]/g, '!');
  }
}
