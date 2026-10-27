import { PrizeLogger, Worker } from './interfaces';

export const logPrize: PrizeLogger = (message: string): void =>
  console.log(`Prize: ${message}`);

const workers: Worker[] = [
  {
    id: 1,
    name: 'Danylo',
    surname: 'Romanovych',
    available: false,
    salary: 1000,
    markPrize: logPrize,
  },
  {
    id: 2,
    name: 'Pavlo',
    surname: 'Skoropadskyi',
    available: true,
    salary: 1500,
    markPrize: logPrize,
  },
  {
    id: 3,
    name: 'Mykola',
    surname: 'Rakhimovskyi',
    available: false,
    salary: 1600,
    markPrize: logPrize,
  },
  {
    id: 4,
    name: 'Jarena',
    surname: 'Vyshnevetskyi',
    available: true,
    salary: 1300,
    markPrize: logPrize,
  },
];

export function getAllWorkers(): Worker[] {
  return workers;
}

export function getWorkerByID(id: number): Worker | undefined {
  return workers.find((w) => w.id === id);
}

export function PrintWorker(worker: Worker): void {
  console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}

export function showWorker(worker: Worker): void {
  console.log(
    `ID: ${worker.id}; ${worker.name} ${worker.surname}; зарплата: ${worker.salary}; доступний: ${worker.available ? 'Так' : 'Ні'}`,
  );
}

export function addWorker(
  name: string,
  surname: string,
  salary: number,
  available: boolean,
): Worker {
  const id = Math.max(0, ...workers.map((w) => w.id)) + 1;
  const worker: Worker = {
    id,
    name,
    surname,
    salary,
    available,
    markPrize: logPrize,
  };
  workers.push(worker);
  return worker;
}
