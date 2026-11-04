import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PotterCharacter, characterKey } from './character';
import { PotterService } from './potter.service';
import { FavoritesService } from './favorites.service';
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
  storageError = '';
  saving = false;

  constructor(
    private readonly potterService: PotterService,
    private readonly favoritesService: FavoritesService,
  ) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadCharacters(), this.loadFavorites()]);
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

  async loadFavorites(): Promise<void> {
    try {
      this.favorites = await this.favoritesService.getAll();
    } catch {
      this.storageError = 'Ionic Storage недоступне. Вибране не зберігатиметься.';
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

  async addFavorite(character: PotterCharacter): Promise<void> {
    if (this.saving || this.storageError || this.isFavorite(character)) return;
    await this.updateFavorites([...this.favorites, character]);
  }

  async removeFavorite(key: string): Promise<void> {
    if (this.saving || this.storageError) return;
    await this.updateFavorites(this.favorites.filter((c) => characterKey(c) !== key));
  }

  private async updateFavorites(updated: PotterCharacter[]): Promise<void> {
    this.saving = true;
    try {
      await this.favoritesService.save(updated);
      this.favorites = updated;
    } catch {
      this.storageError = 'Не вдалося зберегти вибране в Ionic Storage.';
    } finally {
      this.saving = false;
    }
  }
}
