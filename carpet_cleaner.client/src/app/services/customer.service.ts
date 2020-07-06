import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import "rxjs-compat/add/operator/filter";

@Injectable({
    providedIn: "root"
})
export class CustomerService {

  private phoneNumber:Subject<string> = new BehaviorSubject<string>(null);

  get getPhoneNumber():Observable<string>{
    return this.phoneNumber.asObservable().filter(value=> !!value);
  }

  setPhoneNumber(phoneNumber:string) {
    this.phoneNumber.next(phoneNumber);
  }

  private apiPoint: string = 'customer';
  constructor(private api:ApiService) {

  }

  searchByPhoneNumber(phoneNumber:string) {
    let endPoint = this.apiPoint + "/searchByPhone" ;
    return this.api.get(endPoint, phoneNumber)
      .toPromise()
      .then(res=>res);
  }

  getCustomer(customerId: string) {
    let endPoint = this.apiPoint + "/detail" ;
    return this.api.get(endPoint, customerId)
      .toPromise()
      .then(res=>res);
  }
}
