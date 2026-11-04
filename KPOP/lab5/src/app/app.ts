import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PotterCharacter, characterKey } from './character';
import { PotterService } from './potter.service';
import { FavoritesComponent } from './favorites/favorites';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe, FavoritesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  characters: PotterCharacter[] = [];
  favorites: PotterCharacter[] = [];
  selected: PotterCharacter | null = null;
  loading = true;
  error = '';

  constructor(private readonly potterService: PotterService) {}

  async ngOnInit(): Promise<void> {
    await this.loadCharacters();
  }

  async loadCharacters(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      this.characters = await this.potterService.getCharacters();
    } catch {
      this.error = 'Не вдалося завантажити персонажів. Перевірте інтернет.';
    } finally {
      this.loading = false;
    }
  }

  openDetails(character: PotterCharacter): void {
    this.selected = character;
  }

  closeDetails(): void {
    this.selected = null;
  }

  isFavorite(character: PotterCharacter): boolean {
    return this.favorites.some((c) => characterKey(c) === characterKey(character));
  }

  addFavorite(character: PotterCharacter): void {
    if (!this.isFavorite(character)) {
      this.favorites = [...this.favorites, character];
    }
  }

  removeFavorite(key: string): void {
    this.favorites = this.favorites.filter((c) => characterKey(c) !== key);
  }
}
