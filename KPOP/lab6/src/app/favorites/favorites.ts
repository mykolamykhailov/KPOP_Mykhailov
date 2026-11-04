import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PotterCharacter, characterKey } from '../character';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent {
  @Input() characters: PotterCharacter[] = [];
  @Input() disabled = false;
  @Output() remove = new EventEmitter<string>();

  removeCharacter(character: PotterCharacter): void {
    this.remove.emit(characterKey(character));
  }
}
