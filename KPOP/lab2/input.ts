import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export const rl = readline.createInterface({ input: stdin, output: stdout });

export async function readText(prompt: string): Promise<string> {
  while (true) {
    const value = (await rl.question(prompt)).trim();
    if (value) return value;
    console.log('Поле не може бути порожнім.');
  }
}

export async function readNumber(
  prompt: string,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
): Promise<number> {
  while (true) {
    const raw = (await rl.question(prompt)).trim();
    const num = Number(raw);
    if (raw && Number.isSafeInteger(num) && num >= min && num <= max)
      return num;
    console.log('Введіть правильне ціле число.');
  }
}

export async function readEmail(): Promise<string> {
  while (true) {
    const email = await readText('Email: ');
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return email;
    console.log('Неправильний email.');
  }
}
