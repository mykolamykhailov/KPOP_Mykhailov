import { Librarian, Worker } from './interfaces';
import {
  getAllWorkers,
  getWorkerByID,
  PrintWorker,
  showWorker,
  logPrize,
  addWorker,
} from './workers';
import {
  favoriteAuthor,
  originalLibrarian,
  UniversityLibrarian,
} from './librarian';
import { ReferenceItem } from './reference-item';
import { Encyclopedia } from './encyclopedia';
import { rl, readText, readNumber, readEmail } from './input';

let favoriteLibrarian: Librarian = originalLibrarian;

function printPeople(): void {
  console.log(
    `Автор: ${favoriteAuthor.name}; email: ${favoriteAuthor.email}; книг: ${favoriteAuthor.numBooksPublished}`,
  );
  console.log(
    `Бібліотекар: ${favoriteLibrarian.name}; email: ${favoriteLibrarian.email}; відділ: ${favoriteLibrarian.department}`,
  );
}

function runAllTasks(): void {
  console.log('=== 2.1. Worker ===');
  console.log(getAllWorkers());
  const found: Worker | undefined = getWorkerByID(2);
  if (found) PrintWorker(found);

  console.log('=== 2.2. PrizeLogger ===');
  logPrize('Best Developer');
  if (found) found.markPrize('Employee of the Month');

  console.log('=== 2.3. Розширення інтерфейсів ===');
  console.log(
    favoriteAuthor.name,
    favoriteAuthor.email,
    favoriteAuthor.numBooksPublished,
  );
  originalLibrarian.assistCustomer('Mykola');

  console.log('=== 2.4. UniversityLibrarian ===');
  const librarian: Librarian = new UniversityLibrarian();
  librarian.name = 'Oksana';
  librarian.email = 'oksana@example.com';
  librarian.department = 'Computer Science';
  librarian.assistCustomer('Mykola');

  console.log('=== 2.5. ReferenceItem ===');
  const refBook = new Encyclopedia('Encyclopedia of TypeScript', 2024, 2);
  refBook.publisher = 'Tech Press';
  console.log(
    `Назва: ${refBook.title}, Publisher: ${refBook.publisher}, Department: ${ReferenceItem.department}`,
  );

  console.log('=== 2.6. Encyclopedia ===');
  refBook.printItem();
  console.log('=== 2.7. Abstract ===');
  refBook.printCitation();
}

function menu(): void {
  console.log(`
=== ПРАКТИЧНА №2 ===
1. Усі працівники
2. Пошук за ID
3. Нагородити працівника
4. Автор та бібліотекар
5. Створити бібліотекаря
6. Створити енциклопедію
7. Додати працівника
8. Виконати завдання 2.1–2.7
0. Вихід`);
}

async function main(): Promise<void> {
  try {
    while (true) {
      menu();
      const choice = await readNumber('Виберіть дію: ', 0, 8);

      switch (choice) {
        case 1:
          getAllWorkers().forEach(showWorker);
          break;

        case 2: {
          const worker = getWorkerByID(await readNumber('ID: ', 1));
          if (worker) {
            showWorker(worker);
            PrintWorker(worker);
          } else console.log('Не знайдено');
          break;
        }

        case 3: {
          const worker = getWorkerByID(await readNumber('ID: ', 1));
          if (!worker) {
            console.log('Не знайдено');
            break;
          }
          worker.markPrize(await readText('Нагорода: '));
          break;
        }

        case 4:
          printPeople();
          favoriteLibrarian.assistCustomer(await readText('Ім’я клієнта: '));
          break;

        case 5: {
          const lib = new UniversityLibrarian();
          lib.name = await readText('Ім’я: ');
          lib.email = await readEmail();
          lib.department = await readText('Відділ: ');
          favoriteLibrarian = lib;
          printPeople();
          lib.assistCustomer(await readText('Ім’я клієнта: '));
          break;
        }

        case 6: {
          const title = await readText('Назва енциклопедії: ');
          const year = await readNumber('Рік: ', 1, 3000);
          const edition = await readNumber('Видання: ', 1);
          const publisher = await readText('Видавництво: ');
          const book = new Encyclopedia(title, year, edition);
          book.publisher = publisher;
          console.log(`Publisher: ${book.publisher}`);
          book.printItem();
          book.printCitation();
          break;
        }

        case 7: {
          const name = await readText('Ім’я: ');
          const surname = await readText('Прізвище: ');
          const salary = await readNumber('Зарплата: ');
          const available =
            (await readNumber('Доступний (1 — так, 2 — ні): ', 1, 2)) === 1;
          showWorker(addWorker(name, surname, salary, available));
          break;
        }

        case 8:
          runAllTasks();
          break;
        case 0:
          return;
      }
    }
  } finally {
    rl.close();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
