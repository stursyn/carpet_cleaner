import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: "root"
})
export class OperatorService {

  private apiPoint: string = 'operator';
  constructor(private api:ApiService) {

  }

  saveOrder(toSave: any) {
    let endPoint = this.apiPoint + "/saveOrder";
    return this.api.post(endPoint,toSave).toPromise()
      .then(res=>res);
  }
}
