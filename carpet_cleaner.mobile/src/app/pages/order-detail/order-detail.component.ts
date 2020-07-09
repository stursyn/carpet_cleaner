import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {OrderFullRecord} from "../../models/OrderFullRecord";
import {DeliverService} from "../../services/deliver.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  @Input() id: string;
  @Input() showCancelButton:boolean;
  @Input() showSubmitButton:boolean;
  order:OrderFullRecord = new OrderFullRecord();

  constructor(private modalCtrl:ModalController,
              private deliverService:DeliverService) { }

  ngOnInit() {
    if(this.id) {
      this.deliverService.loadOrderDetails(this.id)
        .then(res=>this.order = res);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  finishOrder() {
    this.deliverService.moveOrderToNextStage(this.id)
      .then(res=> this.dismiss());
  }

  cancelOrder() {
    this.deliverService.cancelOrder(this.id)
      .then(()=> this.dismiss());
  }
}
