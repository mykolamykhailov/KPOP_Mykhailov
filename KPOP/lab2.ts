import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

interface PrizeLogger {
  (message: string): void;
}

interface Worker {
  id: number;
  name: string;
  surname: string;
  available: boolean;
  salary: number;
  markPrize: PrizeLogger;
}

const logPrize: PrizeLogger = (message: string): void => {
  console.log(`Prize: ${message}`);
};

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

function getAllWorkers(): Worker[] {
  return workers;
}

function getWorkerByID(id: number): Worker | undefined {
  return getAllWorkers().find((worker: Worker): boolean => worker.id === id);
}

function PrintWorker(worker: Worker): void {
  console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}

function showWorker(worker: Worker): void {
  console.log(`ID: ${worker.id}`);
  console.log(`Ім'я: ${worker.name}`);
  console.log(`Прізвище: ${worker.surname}`);
  console.log(`Зарплата: ${worker.salary}`);
  console.log(`Доступність: ${worker.available ? 'Так' : 'Ні'}`);
  console.log('--------------------------------');
}

interface Person {
  name: string;
  email: string;
}

interface Author extends Person {
  numBooksPublished: number;
}

interface Librarian extends Person {
  department: string;
  assistCustomer(custName: string): void;
}

const favoriteAuthor: Author = {
  name: 'Taras Shevchenko',
  email: 'author@example.com',
  numBooksPublished: 10,
};

const originalLibrarian: Librarian = {
  name: 'Olena',
  email: 'olena@example.com',
  department: 'Literature',

  assistCustomer(custName: string): void {
    console.log(`${this.name} is assisting ${custName}`);
  },
};

let favoriteLibrarian: Librarian = originalLibrarian;

class UniversityLibrarian implements Librarian {
  public name: string = '';
  public email: string = '';
  public department: string = 'University Library';

  public assistCustomer(custName: string): void {
    console.log(`${this.name} is assisting ${custName}`);
  }
}

abstract class ReferenceItem {
  private _publisher: string = '';

  public static department: string = 'Library';

  constructor(
    public title: string,
    protected year: number,
  ) {
    if (!title.trim() || !Number.isInteger(year) || year <= 0) {
      throw new Error('Некоректна назва або рік.');
    }

    console.log('Creating a new ReferenceItem ...');
  }

  public printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
  }

  public get publisher(): string {
    return this._publisher.toUpperCase();
  }

  public set publisher(newPublisher: string) {
    if (!newPublisher.trim()) {
      throw new Error('Видавництво не може бути порожнім.');
    }

    this._publisher = newPublisher;
  }

  public abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
  constructor(
    title: string,
    year: number,
    public edition: number,
  ) {
    super(title, year);

    if (!Number.isInteger(edition) || edition <= 0) {
      throw new Error('Некоректний номер видання.');
    }
  }

  public override printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  public override printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}

const rl = readline.createInterface({ input: stdin, output: stdout });

async function readText(message: string): Promise<string> {
  while (true) {
    const value: string = (await rl.question(message)).trim();

    if (value.length > 0) {
      return value;
    }

    console.log('Помилка! Поле не може бути порожнім.');
  }
}

async function readNumber(
  message: string,
  min: number = 0,
  max: number = Number.MAX_SAFE_INTEGER,
): Promise<number> {
  while (true) {
    const input: string = (await rl.question(message)).trim();
    const value: number = Number(input);

    if (
      input !== '' &&
      Number.isSafeInteger(value) &&
      value >= min &&
      value <= max
    ) {
      return value;
    }

    console.log(`Помилка! Введіть ціле число від ${min} до ${max}.`);
  }
}

async function readEmail(): Promise<string> {
  while (true) {
    const email: string = await readText('Введіть email: ');

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return email;
    }

    console.log('Помилка! Некоректна електронна адреса.');
  }
}

function showPersonInformation(): void {
  console.log('\n========== AUTHOR ==========');
  console.log(`Ім'я: ${favoriteAuthor.name}`);
  console.log(`Email: ${favoriteAuthor.email}`);
  console.log(`Кількість книг: ${favoriteAuthor.numBooksPublished}`);

  console.log('\n========== LIBRARIAN ==========');
  console.log(`Ім'я: ${favoriteLibrarian.name}`);
  console.log(`Email: ${favoriteLibrarian.email}`);
  console.log(`Відділ: ${favoriteLibrarian.department}`);
}

async function createLibrarian(): Promise<void> {
  console.log('\n========== СТВОРЕННЯ БІБЛІОТЕКАРЯ ==========');

  const name: string = await readText("Введіть ім'я бібліотекаря: ");
  const email: string = await readEmail();
  const department: string = await readText('Введіть відділ: ');

  const librarian: UniversityLibrarian = new UniversityLibrarian();

  librarian.name = name;
  librarian.email = email;
  librarian.department = department;

  favoriteLibrarian = librarian;

  console.log('\nБібліотекаря успішно створено!');
  showPersonInformation();

  const customer: string = await readText("\nВведіть ім'я клієнта: ");

  librarian.assistCustomer(customer);
}

async function createEncyclopedia(): Promise<void> {
  console.log('\n========== СТВОРЕННЯ ЕНЦИКЛОПЕДІЇ ==========');

  const title: string = await readText('Введіть назву енциклопедії: ');

  const year: number = await readNumber('Введіть рік видання: ', 1, 3000);

  const edition: number = await readNumber('Введіть номер видання: ', 1);

  const publisher: string = await readText('Введіть назву видавництва: ');

  const refBook: Encyclopedia = new Encyclopedia(title, year, edition);

  refBook.publisher = publisher;

  console.log('\n========== 2.5. ВЛАСТИВОСТІ КЛАСУ ==========');

  console.log(`Назва: ${refBook.title}`);
  console.log(`Publisher: ${refBook.publisher}`);
  console.log(`Department: ${ReferenceItem.department}`);

  console.log('\n========== 2.6. УСПАДКУВАННЯ ==========');

  refBook.printItem();

  console.log('\n========== 2.7. АБСТРАКТНИЙ МЕТОД ==========');

  refBook.printCitation();
}

async function givePrize(): Promise<void> {
  console.log('\n========== НАГОРОДЖЕННЯ ПРАЦІВНИКА ==========');

  const id: number = await readNumber('Введіть ID працівника: ', 1);

  const worker: Worker | undefined = getWorkerByID(id);

  if (worker === undefined) {
    console.log('Працівника не знайдено.');
    return;
  }

  console.log(`Працівник: ${worker.name} ${worker.surname}`);

  const message: string = await readText('Введіть назву нагороди: ');

  worker.markPrize(message);
}

async function addWorker(): Promise<void> {
  console.log('\n========== ДОДАВАННЯ ПРАЦІВНИКА ==========');

  const name: string = await readText("Введіть ім'я: ");
  const surname: string = await readText('Введіть прізвище: ');

  const salary: number = await readNumber('Введіть зарплату: ', 0);

  const availability: number = await readNumber(
    'Працівник доступний? (1 - Так, 2 - Ні): ',
    1,
    2,
  );

  const newID: number =
    workers.length > 0
      ? Math.max(...workers.map((worker: Worker): number => worker.id)) + 1
      : 1;

  const newWorker: Worker = {
    id: newID,
    name,
    surname,
    available: availability === 1,
    salary,
    markPrize: logPrize,
  };

  workers.push(newWorker);

  console.log('\nПрацівника успішно додано!');
  showWorker(newWorker);
}

function runAllTasks(): void {
  console.log('\n========== 2.1. ІНТЕРФЕЙС WORKER ==========');

  const allWorkers: Worker[] = getAllWorkers();

  console.log(allWorkers);

  const foundWorker: Worker | undefined = getWorkerByID(2);

  if (foundWorker !== undefined) {
    PrintWorker(foundWorker);
  }

  console.log('\n========== 2.2. ІНТЕРФЕЙС PRIZELOGGER ==========');

  logPrize('Best Developer');

  if (foundWorker !== undefined) {
    foundWorker.markPrize('Employee of the Month');
  }

  console.log('\n========== 2.3. РОЗШИРЕННЯ ІНТЕРФЕЙСІВ ==========');

  console.log(favoriteAuthor.name);
  console.log(favoriteAuthor.email);
  console.log(favoriteAuthor.numBooksPublished);

  originalLibrarian.assistCustomer('Mykola');

  console.log('\n========== 2.4. UNIVERSITYLIBRARIAN ==========');

  const librarian: UniversityLibrarian = new UniversityLibrarian();

  librarian.name = 'Oksana';
  librarian.email = 'oksana@example.com';
  librarian.department = 'Computer Science';

  const demoLibrarian: Librarian = librarian;

  demoLibrarian.assistCustomer('Mykola');

  console.log('\n========== 2.5. СТВОРЕННЯ КЛАСІВ ==========');

  const refBook: Encyclopedia = new Encyclopedia(
    'Encyclopedia of TypeScript',
    2024,
    2,
  );

  refBook.publisher = 'Tech Press';

  console.log(`Назва: ${refBook.title}`);
  console.log(`Publisher: ${refBook.publisher}`);
  console.log(`Department: ${ReferenceItem.department}`);

  console.log('\n========== 2.6. РОЗШИРЕННЯ КЛАСІВ ==========');

  refBook.printItem();

  console.log('\n========== 2.7. АБСТРАКТНІ КЛАСИ ==========');

  refBook.printCitation();
}

function showMenu(): void {
  console.log('\n========================================');
  console.log('          ПРАКТИЧНА РОБОТА №2');
  console.log('========================================');
  console.log('1. Показати всіх працівників');
  console.log('2. Знайти працівника за ID');
  console.log('3. Нагородити працівника');
  console.log('4. Показати автора та бібліотекаря');
  console.log('5. Створити університетського бібліотекаря');
  console.log('6. Створити енциклопедію');
  console.log('7. Додати нового працівника');
  console.log('8. Виконати всі завдання практичної');
  console.log('0. Вихід');
  console.log('========================================');
}

async function main(): Promise<void> {
  try {
    while (true) {
      showMenu();

      const choice: number = await readNumber('Виберіть дію: ', 0, 8);

      console.log();

      switch (choice) {
        case 1: {
          console.log('========== УСІ ПРАЦІВНИКИ ==========');

          getAllWorkers().forEach((worker: Worker): void => {
            showWorker(worker);
          });

          break;
        }

        case 2: {
          const id: number = await readNumber('Введіть ID працівника: ', 1);

          const worker: Worker | undefined = getWorkerByID(id);

          if (worker !== undefined) {
            showWorker(worker);
            PrintWorker(worker);
          } else {
            console.log('Працівника не знайдено.');
          }

          break;
        }

        case 3: {
          await givePrize();
          break;
        }

        case 4: {
          showPersonInformation();

          const customer: string = await readText("\nВведіть ім'я клієнта: ");

          favoriteLibrarian.assistCustomer(customer);
          break;
        }

        case 5: {
          await createLibrarian();
          break;
        }

        case 6: {
          await createEncyclopedia();
          break;
        }

        case 7: {
          await addWorker();
          break;
        }

        case 8: {
          runAllTasks();
          break;
        }

        case 0: {
          console.log('Завершення практичної роботи №2.');
          return;
        }
      }
    }
  } finally {
    rl.close();
  }
}

void main().catch((error: unknown): void => {
  console.error('Помилка:', error);
  process.exitCode = 1;
});
