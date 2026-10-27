import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export const rl = readline.createInterface({ input: stdin, output: stdout });

export async function readText(prompt: string): Promise<string> {
  while (true) {
    const value = (await rl.question(prompt)).trim();
    if (value) return value;
    console.log('Введіть непорожній текст.');
  }
}

export async function readNumber(
  prompt: string,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
): Promise<number> {
  while (true) {
    const raw = (await rl.question(prompt)).trim();
    const value = Number(raw);
    if (
      raw !== '' &&
      Number.isSafeInteger(value) &&
      value >= min &&
      value <= max
    )
      return value;
    console.log(`Введіть ціле число від ${min} до ${max}.`);
  }
}

export async function readOptionalAge(): Promise<number | undefined> {
  while (true) {
    const raw = (await rl.question('Вік (Enter — пропустити): ')).trim();
    if (!raw) return undefined;
    const value = Number(raw);
    if (Number.isSafeInteger(value) && value >= 0 && value <= 150) return value;
    console.log('Вік повинен бути цілим числом від 0 до 150.');
  }
}

export async function readIDs(): Promise<number[]> {
  while (true) {
    const raw = (await rl.question('ID через кому або пробіл: ')).trim();
    const parts = raw.split(/[\s,]+/);

    if (
      raw &&
      parts.every(
        (s) =>
          /^\d+$/.test(s) && Number.isSafeInteger(Number(s)) && Number(s) > 0,
      )
    )
      return parts.map(Number);

    console.log('Введіть додатні цілі ID.');
  }
}
