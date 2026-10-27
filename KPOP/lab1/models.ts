export enum Category {
  BusinessAnalyst = 'Business analyst',
  Developer = 'Developer',
  Designer = 'Designer',
  QA = 'QA',
  ScrumMaster = 'Scrum master',
}

export interface Worker {
  id: number;
  name: string;
  surname: string;
  available: boolean;
  salary: number;
  category: Category;
}
