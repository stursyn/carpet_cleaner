import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: "root"
})
export class DictionaryService {

  private apiPoint: string = 'dictionary';
  constructor(private api:ApiService) {

  }

  loadDictionary(dictType:string) {
    let endPoint = this.apiPoint + "/list" ;
    return this.api.get(endPoint, dictType)
      .toPromise()
      .then(res=>res);
  }
}
