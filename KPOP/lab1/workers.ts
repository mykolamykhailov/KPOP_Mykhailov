import { Category, Worker } from './models';

const workers: Worker[] = [
  {
    id: 1,
    name: 'Danylo',
    surname: 'Romanovych',
    available: false,
    salary: 1000,
    category: Category.BusinessAnalyst,
  },
  {
    id: 2,
    name: 'Pavlo',
    surname: 'Skoropadskyi',
    available: true,
    salary: 1500,
    category: Category.Developer,
  },
  {
    id: 3,
    name: 'Mykola',
    surname: 'Rakhimovskyi',
    available: false,
    salary: 1600,
    category: Category.Developer,
  },
  {
    id: 4,
    name: 'Jarena',
    surname: 'Vyshnevetskyi',
    available: true,
    salary: 1300,
    category: Category.Designer,
  },
];

export function getAllWorkers(): Worker[] {
  return workers;
}

export function printWorker(w: Worker): void {
  console.log(
    `ID: ${w.id}, ${w.name} ${w.surname}; ${w.category}; зарплата: ${w.salary}; доступний: ${w.available ? 'Так' : 'Ні'}`,
  );
}

export function logFirstAvailable(list: Worker[] = getAllWorkers()): void {
  console.log(`Кількість працівників: ${list.length}`);
  let first: Worker | undefined;

  for (const worker of list) {
    console.log(`${worker.name} ${worker.surname}`);
    if (worker.available && first === undefined) first = worker;
  }

  console.log(
    first
      ? `Перший доступний: ${first.name} ${first.surname}`
      : 'Доступних працівників немає',
  );
}

export function getWorkersSurnamesByCategory(
  category: Category = Category.Designer,
): Array<string> {
  return getAllWorkers()
    .filter((w: Worker): boolean => w.category === category)
    .map((w: Worker): string => w.surname);
}

export function logWorkersNames(names: string[]): void {
  if (names.length === 0) console.log('Працівників не знайдено');
  names.forEach((name: string): void => console.log(name));
}

export function getWorkerByID(id: number): Worker | undefined {
  return getAllWorkers().find((w: Worker): boolean => w.id === id);
}

export function addWorker(
  name: string,
  surname: string,
  salary: number,
  category: Category,
  available: boolean,
): Worker {
  const id = Math.max(0, ...workers.map((w) => w.id)) + 1;
  const worker: Worker = { id, name, surname, salary, category, available };
  workers.push(worker);
  return worker;
}
