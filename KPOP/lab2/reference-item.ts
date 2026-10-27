export abstract class ReferenceItem {
  private _publisher = '';
  public static department = 'Library';

  constructor(
    public title: string,
    protected year: number,
  ) {
    if (!title.trim() || !Number.isInteger(year) || year <= 0)
      throw new Error('Некоректна назва або рік');
    console.log('Creating a new ReferenceItem ...');
  }

  public printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
  }

  public get publisher(): string {
    return this._publisher.toUpperCase();
  }

  public set publisher(value: string) {
    if (!value.trim()) throw new Error('Порожня назва видавництва');
    this._publisher = value;
  }

  public abstract printCitation(): void;
}
