import { getWorkerByID } from './workers';

export function createCustomerID(name: string, id: number): string {
  if (!name.trim() || !Number.isSafeInteger(id) || id <= 0)
    throw new Error('Некоректні дані');
  return `${name}-${id}`;
}

export let idGenerator: (name: string, id: number) => string = (
  name: string,
  id: number,
): string => `${name}-${id}`;

export function setIDGenerator(
  generator: (name: string, id: number) => string,
): void {
  idGenerator = generator;
}

export function createCustomer(
  name: string,
  age?: number,
  city?: string,
): void {
  console.log(`Замовник: ${name}`);
  if (age !== undefined) console.log(`Вік: ${age}`);
  if (city !== undefined && city.trim()) console.log(`Місто: ${city}`);
}

export function checkoutWorkers(
  customer: string,
  ...workerIDs: number[]
): string[] {
  console.log(`Замовник: ${customer}`);
  const names: string[] = [];

  for (const id of new Set(workerIDs)) {
    const worker = getWorkerByID(id);
    if (worker && worker.available)
      names.push(`${worker.name} ${worker.surname}`);
  }

  return names;
}
