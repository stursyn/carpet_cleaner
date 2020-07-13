export class DictRecord {
  public value:string;
  public title:string;
  public priceValue:number;

  constructor(init?: Partial<DictRecord>)
  {
    Object.assign(this, init);
  }
}
