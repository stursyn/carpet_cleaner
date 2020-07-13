import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CustomerRecord} from "../../models/CustomerRecord";
import {OrderRecord} from "../../models/OrderRecord";
import {AddressRecord} from "../../models/AddressRecord";
import {MerchantToSaveRecord} from "../../models/MerchantToSaveRecord";
import {ActivatedRoute, Router} from "@angular/router";
import {DictionaryService} from "../../services/dictionary.service";
import {DictRecord} from "../../models/DictRecord";
import {OrderService} from "../../services/order.service";
import {DeliverService} from "../../services/deliver.service";
import {ILoadEvent} from "angular8-yandex-maps";
import {IonList} from "@ionic/angular";


@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.page.html',
  styleUrls: ['./order-add.page.scss'],
})
export class OrderAddPage implements OnInit {
  customer: CustomerRecord = new CustomerRecord();
  order: OrderRecord = new OrderRecord();
  pickUpAddress: AddressRecord = new AddressRecord();
  merchantList: MerchantToSaveRecord[];
  merchantTypeOption: DictRecord [];
  merchantMaterialOption: DictRecord [];
  merchantMeasurementOption: DictRecord [];
  merchantServiceOption: DictRecord [];
  merchantCountOption: DictRecord [];
  merchantSaleOption: DictRecord [];
  merchantExtraServiceOption: DictRecord [];
  yandexSuggestAddressList: DictRecord [] = [];
  ymaps:any;
  valueFilled:boolean = false;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private orderService:OrderService,
              private dictionaryService:DictionaryService,
              private deliverService:DeliverService,
              private changeDetector : ChangeDetectorRef) {

  }


  ngOnInit(): void {
    this.clearAll();
    this.merchantList.push(new MerchantToSaveRecord());
    this.loadDictionary();
  }

  clearAll() {
    this.customer = new CustomerRecord();
    this.order = new OrderRecord();
    this.pickUpAddress = new AddressRecord();
    this.merchantList =  [];
    this.merchantTypeOption = [];
    this.merchantMeasurementOption =  [];
    this.merchantServiceOption = [];
    this.merchantCountOption = [];
    this.merchantMaterialOption =  [];
    this.merchantSaleOption =  [];
    this.merchantExtraServiceOption =  [];
  }

  loadDictionary() {
    this.orderService.orderNumber()
      .then(res => this.order.number = res.value);
    this.dictionaryService.loadDictionary('MERCHANT_SERVICE')
      .then( res => this.merchantServiceOption = res);
    this.dictionaryService.loadDictionary('MERCHANT_COUNT')
      .then( res => this.merchantCountOption = res);
    this.dictionaryService.loadDictionary('MERCHANT_TYPE')
      .then( res => this.merchantTypeOption = res);
    this.dictionaryService.loadDictionary('MERCHANT_MATERIAL')
      .then( res => this.merchantMaterialOption = res);
    this.dictionaryService.loadDictionary('MERCHANT_MEASUREMENT')
      .then( res => this.merchantMeasurementOption = res);
    this.dictionaryService.loadDictionary('MERCHANT_SALE')
      .then( res => this.merchantSaleOption = res);
    this.dictionaryService.loadDictionary('MERCHANT_EXTRA_SERVICE')
      .then( res => this.merchantExtraServiceOption = res);
  }

  addNewMerchant() {
    this.merchantList.push(new MerchantToSaveRecord());
  }

  deleteMerchant(i: number) {
    this.merchantList.splice(i,1);
  }

  saveOrder() {
    this.order.merchantList = this.merchantList;
    this.order.pickUpAddress = this.pickUpAddress;
    let toSave = {
      customer: this.customer,
      order: this.order
    };
    console.log(toSave);
    this.deliverService.saveNewOrder(toSave)
      .then(res=> {
        this.routeToOrderList();
      });
  }

  routeToOrderList() {
    this.router.navigate(['/main/order-list'], { relativeTo: this.route.root})
  }

  onMapLoad(event: ILoadEvent) {
    this.ymaps = event.ymaps;
  }

  private fillPickedAddress(addressModel: any) {
    if(addressModel.Point.coordinates) {
      this.pickUpAddress.longitude = addressModel.Point.coordinates[0];
      this.pickUpAddress.latitude = addressModel.Point.coordinates[1];
    }
  }

  fillInput(item: string) {
    this.pickUpAddress.displayAddress = item;
    this.ymaps.geocode(item)
      .then(res => {
        this.fillPickedAddress(res.geoObjects.properties._data.metaDataProperty.GeocoderResponseMetaData);
      });
    this.valueFilled = true;
  }

  searchYandexMap(event) {
    this.yandexSuggestAddressList = [];

    if (!event.detail?.value?.trim().length || this.valueFilled) {
      this.valueFilled = false;
      return;
    }

    this.ymaps.suggest(event.detail.value)
    .then(items=> {
      for(let item of items) {
        this.yandexSuggestAddressList.push(new DictRecord({value:item.value, title:item.displayName}))
      }
      this.changeDetector.detectChanges();
    });
  }

  loadBasePrice(merchantRecord:MerchantToSaveRecord) {
    if(merchantRecord && merchantRecord.merchantService
      && merchantRecord.merchantType && merchantRecord.merchantMaterial
      && merchantRecord.merchantMeasurement) {
      this.orderService.loadPrice({ type: merchantRecord.merchantType, service:merchantRecord.merchantService,
        material:merchantRecord.merchantMaterial, measurement:merchantRecord.merchantMeasurement})
        .then(res => {
          merchantRecord.basePrice = res;
          this.recalculatePrice(merchantRecord);
        });

    }
  }

  recalculatePrice(item: MerchantToSaveRecord) {
    let countRec = this.merchantCountOption.find((value)=> {
      return value.value == item.merchantCount;
    });
    let extraSerRec = this.merchantExtraServiceOption.find((value)=> value.value == item.merchantExtraService);
    let saleRec = this.merchantSaleOption.find((value)=> value.value == item.merchantSale);
    let price = item.basePrice * this.calcMeasurement(item)
      * (countRec?countRec.priceValue:1)
      + item.basePrice *  (extraSerRec?extraSerRec.priceValue:0)/ 100.0;
    item.merchantPrice = price - price *  (saleRec?saleRec.priceValue:0)/ 100.0;

    this.calcTotalPrice();
  }

  private calcTotalPrice() {
    let total = 0;
    this.merchantList.forEach( value => total += value.merchantPrice );
    this.order.totalPrice = total;
    this.changeDetector.detectChanges();
  }

  private calcMeasurement(item: MerchantToSaveRecord) {
    if(item.merchantMeasurement == 'measurement2') {
      let size = (item.merchantWidth?item.merchantWidth:0) * (item.merchantHeight?item.merchantHeight:0);
      return size?size:0
    }
    return 1;
  }
}
