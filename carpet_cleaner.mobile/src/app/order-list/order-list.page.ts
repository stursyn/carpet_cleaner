import { Component, OnInit } from '@angular/core';
import {OrderShortRecord} from "../models/OrderShortRecord";
import {DeliverService} from "../services/deliver.service";
import {OrderRouteWay} from "../models/OrderRouteWay";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  needToDeliverOrderList: OrderShortRecord[];
  needToPickUpOrderList: OrderShortRecord[];
  constructor(private deliverService:DeliverService) {

  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.needToDeliverOrderList = [];
    this.needToPickUpOrderList = [];

    this.deliverService.loadOrderByStatus("CREATED")
      .then(res => {
        this.needToPickUpOrderList = res;
      });
    this.deliverService.loadOrderByStatus("TO_DELIVER")
      .then(res => {
        this.needToDeliverOrderList = res;
      });

  }


}
