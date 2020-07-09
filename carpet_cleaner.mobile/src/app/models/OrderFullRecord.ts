import {MerchantRecord} from "./MerchantRecord";

export class OrderFullRecord {
  id:string;
  number:string;
  customerFio:string;
  customerPhoneNumber:string;
  pickUpAddress:string;
  pickUpDateDisplay:string;
  merchantList:MerchantRecord[];

  constructor() {

  }
}