import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Child } from './child/child';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, Child],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  text: string = '';
}
