export class DictRecord {
  public value:string;
  public title:string;

  constructor(init?: Partial<DictRecord>)
  {
    Object.assign(this, init);
  }
}
