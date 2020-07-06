import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: "root"
})
export class OperatorService {

  private apiPoint: string = 'operator';
  constructor(private api:ApiService) {

  }

  findClientByPhoneNumber(phoneNumber:string) {
    let endPoint = this.apiPoint + "/searchCustomerByPhone" ;
    return this.api.get(endPoint, phoneNumber)
      .toPromise()
      .then(res=>res);
  }
}
