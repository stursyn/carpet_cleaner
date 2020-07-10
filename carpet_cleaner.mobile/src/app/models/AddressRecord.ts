export class AddressRecord {
  id:string;
  displayAddress:string;
  longitude:number;
  latitude:number;

  public constructor(init?: Partial<AddressRecord>) {
    Object.assign(this, init);
  }
}
