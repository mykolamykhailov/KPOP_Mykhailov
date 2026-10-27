import { Category, Worker } from './models';
import {
  getAllWorkers,
  getWorkerByID,
  getWorkersSurnamesByCategory,
  logFirstAvailable,
  logWorkersNames,
  printWorker,
  addWorker,
} from './workers';
import {
  createCustomerID,
  createCustomer,
  checkoutWorkers,
  idGenerator,
  setIDGenerator,
} from './customers';
import { rl, readText, readNumber, readOptionalAge, readIDs } from './input';

async function selectCategory(): Promise<Category> {
  const categories = Object.values(Category);
  categories.forEach((category, i) => console.log(`${i + 1}. ${category}`));
  return categories[
    (await readNumber('Категорія: ', 1, categories.length)) - 1
  ]!;
}

function runAllTasks(): void {
  console.log('=== 1.1. Базові типи ===');
  console.log(getAllWorkers());
  logFirstAvailable();

  console.log('=== 1.2. Enum і фільтрація ===');
  logWorkersNames(getWorkersSurnamesByCategory(Category.Developer));
  logWorkersNames(getWorkersSurnamesByCategory());

  console.log('=== 1.3. Стрілочні функції ===');
  getAllWorkers()
    .filter((w: Worker) => w.category === Category.Developer)
    .forEach((w: Worker) => console.log(`${w.name} ${w.surname}`));

  const found = getWorkerByID(2);
  if (found)
    console.log(`${found.name} ${found.surname}, зарплата: ${found.salary}`);

  console.log('=== 1.4. Типи функцій ===');
  const myID: string = createCustomerID('Mykola', 1);
  console.log(myID);
  console.log(idGenerator('Mykola', 1));
  setIDGenerator(createCustomerID);
  console.log(idGenerator('Mykola', 1));

  console.log('=== 1.5. Параметри ===');
  createCustomer('Mykola');
  createCustomer('Mykola', 18);
  createCustomer('Mykola', 18, 'Kyiv');
  logFirstAvailable();
  logWorkersNames(getWorkersSurnamesByCategory());
  const selected = checkoutWorkers(
    'Mykola',
    ...getAllWorkers().map((w) => w.id),
  );
  selected.forEach((name) => console.log(name));
}

function menu(): void {
  console.log(`
=== ПРАКТИЧНА №1 ===
1. Усі працівники
2. Перший доступний
3. Фільтр за категорією
4. Пошук за ID
5. Створити замовника
6. Обрати доступних працівників
7. Створити ID замовника
8. Додати працівника
9. Змінити доступність
10. Виконати завдання 1.1–1.5
0. Вихід`);
}

async function main(): Promise<void> {
  try {
    while (true) {
      menu();
      const action = await readNumber('Виберіть дію: ', 0, 10);

      switch (action) {
        case 1:
          getAllWorkers().forEach(printWorker);
          break;
        case 2:
          logFirstAvailable();
          break;
        case 3:
          logWorkersNames(getWorkersSurnamesByCategory(await selectCategory()));
          break;

        case 4: {
          const worker = getWorkerByID(await readNumber('ID: ', 1));
          worker ? printWorker(worker) : console.log('Не знайдено');
          break;
        }

        case 5: {
          const name = await readText('Ім’я: ');
          const age = await readOptionalAge();
          const city = (
            await rl.question('Місто (Enter — пропустити): ')
          ).trim();
          createCustomer(name, age, city || undefined);
          break;
        }

        case 6: {
          const customer = await readText('Замовник: ');
          logWorkersNames(checkoutWorkers(customer, ...(await readIDs())));
          break;
        }

        case 7:
          console.log(
            createCustomerID(
              await readText('Ім’я: '),
              await readNumber('Номер: ', 1),
            ),
          );
          break;

        case 8: {
          const name = await readText('Ім’я: ');
          const surname = await readText('Прізвище: ');
          const salary = await readNumber('Зарплата: ');
          const category = await selectCategory();
          const available =
            (await readNumber('Доступний (1 — так, 2 — ні): ', 1, 2)) === 1;
          printWorker(addWorker(name, surname, salary, category, available));
          break;
        }

        case 9: {
          const worker = getWorkerByID(await readNumber('ID: ', 1));
          if (!worker) {
            console.log('Не знайдено');
            break;
          }
          worker.available =
            (await readNumber('Доступний (1 — так, 2 — ні): ', 1, 2)) === 1;
          printWorker(worker);
          break;
        }

        case 10:
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
