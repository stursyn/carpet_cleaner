import {Component, Input, OnInit} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {OrderService} from "../../../../services/order.service";
import {OrderRecord} from "../model/OrderRecord";

@Component({
  selector: 'app-order-dialog',
  templateUrl: 'order-dialog.component.html',
  styleUrls: ['order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {

  @Input() id: string;

  data: OrderRecord = new OrderRecord();
  constructor(protected ref: NbDialogRef<OrderDialogComponent>,
              private orderService:OrderService) {
  }

  ngOnInit(): void {
    if(this.id) {
      this.orderService.orderDetail(this.id)
        .then(res=> {
          this.data = res;
        });
    }
  }

  dismiss() {
    this.ref.close();
  }

  submit() {
    this.orderService.saveOrder(this.data)
       .then( res => this.ref.close(res))
  }
}
