import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class NavigationService {
  private orderListRefresh = new Subject();
  orderListRefreshObservable = this.orderListRefresh.asObservable();

  private orderMapRefresh = new Subject();
  orderMapRefreshObservable = this.orderMapRefresh.asObservable();

  constructor(){}

  doOrderListRefresh() {
    this.orderListRefresh.next(true);
  }

  doOrderMapRefresh() {
    this.orderMapRefresh.next(true);
  }

}
