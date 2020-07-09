import { Component, OnInit } from '@angular/core';
import {OrderShortRecord} from "../../models/OrderShortRecord";
import {DeliverService} from "../../services/deliver.service";
import {NavigationService} from "../../services/navigation.service";
import {ModalController} from "@ionic/angular";
import {OrderDetailComponent} from "../order-detail/order-detail.component";

@Component({
  selector: 'app-done-orders',
  templateUrl: './done-orders.page.html',
  styleUrls: ['./done-orders.page.scss'],
})
export class DoneOrdersPage implements OnInit {
  needToDeliverOrderList: OrderShortRecord[];
  needToPickUpOrderList: OrderShortRecord[];
  pickedUpCount: number = 0;
  deliveredCount: number = 0;

  constructor(private deliverService:DeliverService,
              private navigationService:NavigationService,
              private modalController:ModalController) {
    this.navigationService.orderListRefreshObservable
      .subscribe(value => {
        if(value) this.loadData();
      })
  }

  ngOnInit() {
    this.loadData()
  }

  loadData(action = null) {
    this.needToDeliverOrderList = [];
    this.needToPickUpOrderList = [];
    this.pickedUpCount = 0;
    this.deliveredCount = 0;

    this.deliverService.loadOrderByStatus("PICKED_UP")
      .then(res => {
        this.needToPickUpOrderList = res;
        if(action) action.complete();
      });
    this.deliverService.loadOrderByStatus("DELIVERED")
      .then(res => {
        this.needToDeliverOrderList = res;
        if(action) action.complete();
      });
    this.deliverService.loadDoneOrderCountByStatus("PICKED_UP")
      .then(res=> {
        this.pickedUpCount = res;
      });
    this.deliverService.loadDoneOrderCountByStatus("DELIVERED")
      .then(res=> {
        this.deliveredCount = res;
      });

  }

  async showOrderDetail(event) {
    let modal = await this.modalController.create(
      {
        component: OrderDetailComponent,
        cssClass: 'my-custom-class',
        swipeToClose: true,
        presentingElement: await this.modalController.getTop(),
        componentProps: {
          'id': event.id,
          'showCancelButton': event.showCancelButton,
          'showSubmitButton': false
        }
      });

    modal.onDidDismiss().then(data=> {
      this.loadData()
    });

    return await modal.present();
  }

  doRefresh(event) {
    this.loadData(event.target)
  }
}
