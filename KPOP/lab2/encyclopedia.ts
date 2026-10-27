import { ReferenceItem } from './reference-item';

export class Encyclopedia extends ReferenceItem {
  constructor(
    title: string,
    year: number,
    public edition: number,
  ) {
    super(title, year);
    if (!Number.isInteger(edition) || edition <= 0)
      throw new Error('Некоректний номер видання');
  }

  public override printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  public override printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}
