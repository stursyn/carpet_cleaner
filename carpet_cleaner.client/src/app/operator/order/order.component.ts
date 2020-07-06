import {Component, OnInit} from '@angular/core';
import {DictRecord} from "../model/DictRecord";
import {TranslateService} from "@ngx-translate/core";
import {CustomerRecord} from "../model/CustomerRecord";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import {DictionaryService} from "../../services/dictionary.service";
import {OrderRecord} from "../../main/order/model/OrderRecord";
import {MerchantRecord} from "../model/MerchantRecord";

@Component({
  selector: 'app-add-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  customer: CustomerRecord =  new CustomerRecord();
  order: OrderRecord = new OrderRecord();
  merchantList: MerchantRecord[] = [];
  merchantTypeOption: DictRecord [];
  merchantMaterialOption: DictRecord [];
  merchantMeasurementOption: DictRecord [];
  merchantServiceOption: DictRecord [];
  merchantCountOption: DictRecord [];

  constructor(private route:ActivatedRoute,
              private customerService:CustomerService,
              private dictionaryService:DictionaryService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      let customerId = params['customerId'];
      if(customerId) {
        this.customerService.getCustomer(customerId)
          .then( result => this.customer = result);
      }
    })

    this.merchantList.push(new MerchantRecord());
    this.loadDictionary();
  }

  loadDictionary() {
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
  }

  addNewMerchant() {
    this.merchantList.push(new MerchantRecord());
  }

  deleteMerchant(i: number) {
    console.log(i);
    this.merchantList.splice(i,1);
  }
}
