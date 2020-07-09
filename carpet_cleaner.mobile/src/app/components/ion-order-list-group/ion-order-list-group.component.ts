import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderShortRecord} from "../../models/OrderShortRecord";

@Component({
  selector: 'app-ion-order-list-group',
  templateUrl: './ion-order-list-group.component.html',
  styleUrls: ['./ion-order-list-group.component.scss'],
})
export class IonOrderListGroupComponent implements OnInit {
  @Input() orderList: OrderShortRecord[];
  @Input() doneCount: number;
  @Input() itemGroupTitle: string;
  @Input() itemIsDetail: boolean = false;
  @Input() itemIsButton: boolean = false;
  @Input() canCancelOrder: boolean = false;
  @Input() showCount: boolean = false;

  @Output() itemClicked = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit() {}

  itemClick(id: string) {
    this.itemClicked.emit({id:id, canCancelOrder:this.canCancelOrder})
  }

  getCount() {
    if(this.showCount)
      return '(' + this.doneCount +'/' + this.orderList?.length+')';
    return '(' + this.doneCount + ')';
  }
}
