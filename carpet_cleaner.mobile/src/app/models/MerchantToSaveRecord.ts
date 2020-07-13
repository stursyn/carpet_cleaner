export class MerchantToSaveRecord {
  public id:string;
  public merchantService:string;
  public merchantType:string;
  public merchantCount:string;
  public merchantMaterial:string;
  public merchantMeasurement:string;
  public merchantWidth:number;
  public merchantHeight:number;
  public merchantExtraService:string;
  public merchantSale:string;
  public merchantPrice:number;
  public basePrice: number = 0;

  constructor() {}
}
