import { Author, Librarian } from './interfaces';

export const favoriteAuthor: Author = {
  name: 'Taras Shevchenko',
  email: 'author@example.com',
  numBooksPublished: 10,
};

export const originalLibrarian: Librarian = {
  name: 'Olena',
  email: 'olena@example.com',
  department: 'Literature',
  assistCustomer(custName: string): void {
    console.log(`${this.name} is assisting ${custName}`);
  },
};

export class UniversityLibrarian implements Librarian {
  public name = '';
  public email = '';
  public department = 'University Library';

  public assistCustomer(custName: string): void {
    console.log(`${this.name} is assisting ${custName}`);
  }
}
