import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PotterCharacter } from './character';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly key = 'potter-favorites-lab6';
  private readonly ready: Promise<Storage>;

  constructor(storage: Storage) {
    this.ready = storage.create();
  }

  async getAll(): Promise<PotterCharacter[]> {
    const storage = await this.ready;
    const value: unknown = await storage.get(this.key);
    return Array.isArray(value) ? (value as PotterCharacter[]) : [];
  }

  async save(characters: PotterCharacter[]): Promise<void> {
    const storage = await this.ready;
    await storage.set(this.key, characters);
  }
}
