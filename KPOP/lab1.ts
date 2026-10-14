
import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

enum Category {
    BusinessAnalyst = "Business analyst",
    Developer = "Developer",
    Designer = "Designer",
    QA = "QA",
    ScrumMaster = "Scrum master"
}

interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
    category: Category;
}

const workers: Worker[] = [
    { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, category: Category.BusinessAnalyst },
    { id: 2, name: "Pavlo", surname: "Skoropadskyi", available: true, salary: 1500, category: Category.Developer },
    { id: 3, name: "Mykola", surname: "Rakhimovskyi", available: false, salary: 1600, category: Category.Developer },
    { id: 4, name: "Jarena", surname: "Vyshnevetskyi", available: true, salary: 1300, category: Category.Designer }
];

const rl = readline.createInterface({ input: stdin, output: stdout });

function getAllWorkers(): Worker[] {
    return workers;
}

function printWorker(worker: Worker): void {
    console.log(`ID: ${worker.id}`);
    console.log(`Ім'я: ${worker.name}`);
    console.log(`Прізвище: ${worker.surname}`);
    console.log(`Категорія: ${worker.category}`);
    console.log(`Зарплата: ${worker.salary}`);
    console.log(`Доступність: ${worker.available ? "Так" : "Ні"}`);
    console.log("--------------------------------");
}

function logFirstAvailable(list: Worker[] = getAllWorkers()): void {
    console.log(`Кількість працівників: ${list.length}`);

    let firstAvailable: Worker | undefined;

    for (const worker of list) {
        console.log(`${worker.name} ${worker.surname}`);

        if (worker.available && firstAvailable === undefined) {
            firstAvailable = worker;
        }
    }

    if (firstAvailable !== undefined) {
        console.log(`Перший доступний: ${firstAvailable.name} ${firstAvailable.surname}`);
    } else {
        console.log("Доступних працівників немає.");
    }
}

function getWorkersSurnamesByCategory(
    category: Category = Category.Designer
): Array<string> {
    return getAllWorkers()
        .filter((worker: Worker): boolean => worker.category === category)
        .map((worker: Worker): string => worker.surname);
}

function logWorkersNames(names: string[]): void {
    if (names.length === 0) {
        console.log("Працівників не знайдено.");
        return;
    }

    for (const name of names) {
        console.log(name);
    }
}

function getWorkerByID(id: number): Worker | undefined {
    return getAllWorkers().find(
        (worker: Worker): boolean => worker.id === id
    );
}

function createCustomerID(name: string, id: number): string {
    if (!name.trim() || !Number.isSafeInteger(id) || id <= 0) {
        throw new Error("Некоректне ім'я або ID.");
    }

    return `${name}-${id}`;
}

let idGenerator: (name: string, id: number) => string =
    (name: string, id: number): string => {
        return `${name}-${id}`;
    };

function createCustomer(
    name: string,
    age?: number,
    city?: string
): void {
    console.log(`Замовник: ${name}`);

    if (age !== undefined) {
        console.log(`Вік: ${age}`);
    }

    if (city !== undefined && city.trim() !== "") {
        console.log(`Місто: ${city}`);
    }
}

function checkoutWorkers(
    customer: string,
    ...workerIDs: number[]
): string[] {
    console.log(`Замовник: ${customer}`);

    const availableWorkers: string[] = [];

    for (const id of new Set(workerIDs)) {
        const worker: Worker | undefined = getWorkerByID(id);

        if (worker !== undefined && worker.available) {
            availableWorkers.push(`${worker.name} ${worker.surname}`);
        }
    }

    return availableWorkers;
}

async function readText(message: string): Promise<string> {
    while (true) {
        const value: string = (await rl.question(message)).trim();

        if (value.length > 0) {
            return value;
        }

        console.log("Помилка! Поле не може бути порожнім.");
    }
}

async function readNumber(
    message: string,
    min: number = 0,
    max: number = Number.MAX_SAFE_INTEGER
): Promise<number> {
    while (true) {
        const input: string = (await rl.question(message)).trim();
        const value: number = Number(input);

        if (
            input !== "" &&
            Number.isSafeInteger(value) &&
            value >= min &&
            value <= max
        ) {
            return value;
        }

        console.log(`Помилка! Введіть ціле число від ${min} до ${max}.`);
    }
}

async function readOptionalAge(): Promise<number | undefined> {
    while (true) {
        const input: string = (
            await rl.question("Введіть вік (Enter - пропустити): ")
        ).trim();

        if (input === "") {
            return undefined;
        }

        const age: number = Number(input);

        if (Number.isSafeInteger(age) && age >= 0 && age <= 150) {
            return age;
        }

        console.log("Помилка! Введіть правильний вік.");
    }
}

async function selectCategory(): Promise<Category> {
    const categories: Category[] = Object.values(Category);

    console.log("\nКатегорії працівників:");

    categories.forEach((category: Category, index: number): void => {
        console.log(`${index + 1}. ${category}`);
    });

    const choice: number = await readNumber(
        "Виберіть категорію: ",
        1,
        categories.length
    );

    return categories[choice - 1]!;
}

async function readWorkerIDs(): Promise<number[]> {
    while (true) {
        const input: string = await rl.question(
            "Введіть ID працівників через пробіл або кому: "
        );

        const parts: string[] = input.trim().split(/[\s,]+/);

        if (
            parts.length > 0 &&
            parts.every((part: string): boolean =>
                /^\d+$/.test(part) &&
                Number.isSafeInteger(Number(part)) &&
                Number(part) > 0
            )
        ) {
            return parts.map((part: string): number => Number(part));
        }

        console.log("Помилка! Введіть правильні числові ID.");
    }
}

function runAllTasks(): void {
    console.log("\n========== 1.1. БАЗОВІ ТИПИ ==========");

    console.log(getAllWorkers());
    logFirstAvailable();

    console.log("\n========== 1.2. ENUM І ФІЛЬТРАЦІЯ ==========");

    console.log("Прізвища розробників:");
    logWorkersNames(getWorkersSurnamesByCategory(Category.Developer));

    console.log("Категорія за замовчуванням:");
    logWorkersNames(getWorkersSurnamesByCategory());

    console.log("\n========== 1.3. СТРІЛОЧНІ ФУНКЦІЇ ==========");

    getAllWorkers()
        .filter((worker: Worker): boolean =>
            worker.category === Category.Developer
        )
        .forEach((worker: Worker): void => {
            console.log(`${worker.name} ${worker.surname}`);
        });

    const foundWorker: Worker | undefined = getWorkerByID(2);

    if (foundWorker !== undefined) {
        console.log(
            `${foundWorker.name} ${foundWorker.surname}, зарплата: ${foundWorker.salary}`
        );
    }

    console.log("\n========== 1.4. ТИПИ ФУНКЦІЙ ==========");

    let myID: string = createCustomerID("Mykola", 1);
    console.log(myID);

    console.log(idGenerator("Mykola", 1));

    idGenerator = createCustomerID;
    console.log(idGenerator("Mykola", 1));

    console.log("\n========== 1.5. ПАРАМЕТРИ ==========");

    createCustomer("Mykola");
    createCustomer("Mykola", 18);
    createCustomer("Mykola", 18, "Kyiv");

    logFirstAvailable();
    logWorkersNames(getWorkersSurnamesByCategory());

    const myWorkers: string[] = checkoutWorkers(
        "Mykola",
        ...getAllWorkers().map((worker: Worker): number => worker.id)
    );

    myWorkers.forEach((name: string): void => {
        console.log(name);
    });
}

function showMenu(): void {
    console.log("\n========================================");
    console.log("          ПРАКТИЧНА РОБОТА №1");
    console.log("========================================");
    console.log("1. Показати всіх працівників");
    console.log("2. Показати першого доступного працівника");
    console.log("3. Знайти працівників за категорією");
    console.log("4. Знайти працівника за ID");
    console.log("5. Створити замовника");
    console.log("6. Вибрати доступних працівників");
    console.log("7. Створити ID замовника");
    console.log("8. Додати нового працівника");
    console.log("9. Змінити доступність працівника");
    console.log("10. Виконати всі завдання практичної");
    console.log("0. Вихід");
    console.log("========================================");
}

async function main(): Promise<void> {
    try {
        while (true) {
            showMenu();

            const choice: number = await readNumber(
                "Виберіть дію: ",
                0,
                10
            );

            console.log();

            switch (choice) {
                case 1: {
                    console.log("========== УСІ ПРАЦІВНИКИ ==========");

                    getAllWorkers().forEach((worker: Worker): void => {
                        printWorker(worker);
                    });

                    break;
                }

                case 2: {
                    console.log("========== ДОСТУПНІСТЬ ==========");
                    logFirstAvailable();
                    break;
                }

                case 3: {
                    const category: Category = await selectCategory();

                    console.log(`\nКатегорія: ${category}`);

                    const names: Array<string> =
                        getWorkersSurnamesByCategory(category);

                    logWorkersNames(names);
                    break;
                }

                case 4: {
                    const id: number = await readNumber(
                        "Введіть ID працівника: ",
                        1
                    );

                    const worker: Worker | undefined = getWorkerByID(id);

                    if (worker !== undefined) {
                        printWorker(worker);
                    } else {
                        console.log("Працівника не знайдено.");
                    }

                    break;
                }

                case 5: {
                    const name: string = await readText(
                        "Введіть ім'я замовника: "
                    );

                    const age: number | undefined = await readOptionalAge();

                    const cityInput: string = (
                        await rl.question(
                            "Введіть місто (Enter - пропустити): "
                        )
                    ).trim();

                    const city: string | undefined =
                        cityInput === "" ? undefined : cityInput;

                    console.log("\n========== ЗАМОВНИК ==========");

                    createCustomer(name, age, city);
                    break;
                }

                case 6: {
                    const customer: string = await readText(
                        "Введіть ім'я замовника: "
                    );

                    const ids: number[] = await readWorkerIDs();

                    const available: string[] = checkoutWorkers(
                        customer,
                        ...ids
                    );

                    console.log("\nДоступні працівники:");
                    logWorkersNames(available);
                    break;
                }

                case 7: {
                    const name: string = await readText(
                        "Введіть ім'я: "
                    );

                    const id: number = await readNumber(
                        "Введіть номер за списком: ",
                        1
                    );

                    const customerID: string = createCustomerID(name, id);

                    console.log(`Створений ID: ${customerID}`);
                    break;
                }

                case 8: {
                    const name: string = await readText("Ім'я: ");
                    const surname: string = await readText("Прізвище: ");
                    const salary: number = await readNumber("Зарплата: ", 0);
                    const category: Category = await selectCategory();

                    const availability: number = await readNumber(
                        "Доступний? (1 - Так, 2 - Ні): ",
                        1,
                        2
                    );

                    const newID: number = workers.length > 0
                        ? Math.max(...workers.map(
                        (worker: Worker): number => worker.id
                    )) + 1
                        : 1;

                    const newWorker: Worker = {
                        id: newID,
                        name,
                        surname,
                        available: availability === 1,
                        salary,
                        category
                    };

                    workers.push(newWorker);

                    console.log("\nПрацівника успішно додано!");
                    printWorker(newWorker);
                    break;
                }

                case 9: {
                    const id: number = await readNumber(
                        "Введіть ID працівника: ",
                        1
                    );

                    const worker: Worker | undefined = getWorkerByID(id);

                    if (worker === undefined) {
                        console.log("Працівника не знайдено.");
                        break;
                    }

                    console.log(
                        `Поточна доступність: ${worker.available ? "Так" : "Ні"}`
                    );

                    const status: number = await readNumber(
                        "Нова доступність (1 - Так, 2 - Ні): ",
                        1,
                        2
                    );

                    worker.available = status === 1;

                    console.log("Дані успішно оновлено.");
                    printWorker(worker);
                    break;
                }

                case 10: {
                    runAllTasks();
                    break;
                }

                case 0: {
                    console.log("Завершення практичної роботи №1.");
                    return;
                }
            }
        }
    } finally {
        rl.close();
    }
}

void main().catch((error: unknown): void => {
    console.error("Помилка:", error);
    process.exitCode = 1;
});
