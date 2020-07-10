import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: "root"
})
export class DeliverService {

  private apiPoint: string = 'deliver';
  constructor(private api:ApiService) {
  }

  loadOrderByStatus(orderStatus:string) {
    const endPoint = this.apiPoint + "/orderByStatus";
    return this.api.get(endPoint, {orderStatus: orderStatus}).toPromise()
      .then(res => res);
  }

  loadOrderDetails(orderId:string) {
    const endPoint = this.apiPoint + "/orderDetail";
    return this.api.get(endPoint, {orderId: orderId}).toPromise()
      .then(res => res);
  }

  moveOrderToNextStage(orderId:string) {
    const endPoint = this.apiPoint + "/orderMoveStage";
    return this.api.get(endPoint, {orderId: orderId}).toPromise()
      .then(res => res);
  }

  loadDoneOrderCountByStatus(orderStatus:string) {
    const endPoint = this.apiPoint + "/doneOrderCount";
    return this.api.get(endPoint, {orderStatus: orderStatus}).toPromise()
      .then(res => res);
  }

  cancelOrder(orderId: string) {
    const endPoint = this.apiPoint + "/cancelOrder";
    return this.api.get(endPoint, {orderId: orderId}).toPromise()
      .then(res => res);
  }

  saveNewOrder(toSave:any) {
    let endPoint = this.apiPoint + "/saveOrder";
    return this.api.post(endPoint,toSave).toPromise()
      .then(res=>res);
  }
}
