import {AddressRecord} from "./AddressRecord";
import {MerchantToSaveRecord} from "./MerchantToSaveRecord";

export class OrderRecord {
  id:string;
  number:string;
  pickUpDate:Date;
  merchantList: MerchantToSaveRecord[];
  pickUpAddress: AddressRecord;
  totalPrice: number = 0;

  public constructor(init?: Partial<OrderRecord>) {
    Object.assign(this, init);
  }
}
