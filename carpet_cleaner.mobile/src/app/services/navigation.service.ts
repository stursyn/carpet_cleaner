import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class NavigationService {
  private orderListRefresh = new BehaviorSubject(false);
  orderListRefreshObservable = this.orderListRefresh.asObservable();

  private orderMapRefresh = new BehaviorSubject(false);
  orderMapRefreshObservable = this.orderMapRefresh.asObservable();

  constructor(){}

  doOrderListRefresh() {
    this.orderListRefresh.next(true);
  }

  doOrderMapRefresh() {
    this.orderMapRefresh.next(true);
  }

}
