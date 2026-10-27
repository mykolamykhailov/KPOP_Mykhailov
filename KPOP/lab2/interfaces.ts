export interface PrizeLogger {
  (message: string): void;
}

export interface Worker {
  id: number;
  name: string;
  surname: string;
  available: boolean;
  salary: number;
  markPrize: PrizeLogger;
}

export interface Person {
  name: string;
  email: string;
}

export interface Author extends Person {
  numBooksPublished: number;
}

export interface Librarian extends Person {
  department: string;
  assistCustomer(custName: string): void;
}
