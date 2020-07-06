export class OrderRecord {
  id:string;
  number:string;
  pickUpDate:Date;

  public constructor(init?: Partial<OrderRecord>) {
    Object.assign(this, init);
  }
}
