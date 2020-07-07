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
    const endPoint = this.apiPoint + "/orderByStatus"
    return this.api.get(endPoint, {orderStatus: orderStatus}).toPromise()
      .then(res => res);
  }
}
