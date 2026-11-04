import { Injectable } from '@angular/core';
import axios from 'axios';
import { PotterCharacter } from './character';

@Injectable({ providedIn: 'root' })
export class PotterService {
  private readonly apiUrl = 'https://potterapi-fedeperin.vercel.app/uk/characters';

  async getCharacters(): Promise<PotterCharacter[]> {
    const response = await axios.get<PotterCharacter[]>(this.apiUrl, {
      timeout: 15000,
    });

    if (!Array.isArray(response.data)) {
      throw new Error('API повернуло неправильний формат даних.');
    }

    return response.data;
  }
}
