import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import "rxjs-compat/add/operator/filter";

@Injectable({
    providedIn: "root"
})
export class CustomerService {

  private apiPoint: string = 'customer';
  constructor(private api:ApiService) {

  }

  searchByPhoneNumber(phoneNumber:string) {
    let endPoint = this.apiPoint + "/searchByPhone" ;
    return this.api.get(endPoint, {phoneNumber:phoneNumber})
      .toPromise()
      .then(res=>res);
  }

  getCustomer(customerId: string) {
    let endPoint = this.apiPoint + "/detail" ;
    return this.api.get(endPoint, {customerId:customerId})
      .toPromise()
      .then(res=>res);
  }
}
