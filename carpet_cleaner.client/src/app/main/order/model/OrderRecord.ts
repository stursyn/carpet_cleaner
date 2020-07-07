import {MerchantRecord} from "../../../operator/model/MerchantRecord";
import {AddressRecord} from "../../../operator/model/AddressRecord";

export class OrderRecord {
  id:string;
  number:string;
  pickUpDate:Date;
  merchantList: MerchantRecord[];
  pickUpAddress: AddressRecord;

  public constructor(init?: Partial<OrderRecord>) {
    Object.assign(this, init);
  }
}
