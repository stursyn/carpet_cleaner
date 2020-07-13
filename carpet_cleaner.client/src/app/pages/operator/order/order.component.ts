import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DictRecord} from "../model/DictRecord";
import {CustomerRecord} from "../model/CustomerRecord";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {OrderRecord} from "../../main/order/model/OrderRecord";
import {MerchantRecord} from "../model/MerchantRecord";
import {OperatorService} from "../../../services/operator.service";
import {OrderService} from "../../../services/order.service";
import {ILoadEvent} from "angular8-yandex-maps";
import {AddressRecord} from "../model/AddressRecord";

@Component({
  selector: 'app-add-order',
  templateUrl: './order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  customer: CustomerRecord;
  order: OrderRecord;
  pickUpAddress: AddressRecord;
  merchantList: MerchantRecord[] = [];
  merchantTypeOption: DictRecord [];
  merchantMaterialOption: DictRecord [];
  merchantMeasurementOption: DictRecord [];
  merchantServiceOption: DictRecord [];
  merchantCountOption: DictRecord [];
  merchantExtraServiceOption: DictRecord [];
  merchantSaleOption: DictRecord [];
  searchParameters = {
    options: {
      provider: 'yandex#search'
    }
  };

  constructor(private route:ActivatedRoute,
              private router:Router,
              private operatorService:OperatorService,
              private orderService:OrderService,
              private customerService:CustomerService,
              private dictionaryService:DictionaryService,
              private changeDet: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.clearAll();

    this.route.queryParams.subscribe( params => {
      let customerId = params['customerId'];
      if(customerId) {
        this.customerService.getCustomer(customerId)
          .then( result => this.customer = result);
      }
    });

    this.merchantList.push(new MerchantRecord());
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
    this.merchantExtraServiceOption =  [];
    this.merchantSaleOption =  [];
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
    this.dictionaryService.loadDictionary('MERCHANT_EXTRA_SERVICE')
      .then( res => this.merchantExtraServiceOption = res);
    this.dictionaryService.loadDictionary('MERCHANT_SALE')
      .then( res => this.merchantSaleOption = res);
  }

  addNewMerchant() {
    this.merchantList.push(new MerchantRecord());
  }

  deleteMerchant(i: number) {
    this.merchantList.splice(i,1);
  }

  loadBasePrice(merchantRecord:MerchantRecord) {
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

  routeToStartPage() {
    this.router.navigate(['start-page'],{relativeTo: this.route.parent})
  }

  cancel() {
    this.routeToStartPage();
  }

  save() {
    this.order.merchantList = this.merchantList;
    this.order.pickUpAddress = this.pickUpAddress;
    let toSave = {
      customer: this.customer,
      order: this.order
    };
    this.operatorService.saveOrder(toSave)
      .then(res=> {
        this.routeToStartPage();
      });
  }

  onSearchAddressControlLoad(event: ILoadEvent) {
    const searchControl = event.instance;
    searchControl.events.add(
      ['resultshow'],
      e => {
        this.fillPickedAddress(e.get('target')._yandexState._model);
      }
    );
  }

  private fillPickedAddress(addressModel: any) {
    this.pickUpAddress.displayAddress = addressModel.request;
    if(addressModel.resultCoordinates) {
      this.pickUpAddress.latitude = addressModel.resultCoordinates[0];
      this.pickUpAddress.longitude = addressModel.resultCoordinates[1];
    }
  }

  recalculatePrice(item: MerchantRecord) {
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
    this.changeDet.detectChanges();
  }

  private calcMeasurement(item: MerchantRecord) {
    if(item.merchantMeasurement == 'measurement2') {
      let size = (item.merchantWidth?item.merchantWidth:0) * (item.merchantHeight?item.merchantHeight:0);
      return size?size:0
    }
    return 1;
  }
}
