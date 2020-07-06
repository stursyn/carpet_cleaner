import { Component, OnInit } from '@angular/core';
import {NbSearchService} from "@nebular/theme";
import {OperatorService} from "../services/operator.service";
import {CustomerRecord} from "./model/CustomerRecord";

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  customerList:CustomerRecord[];

  constructor(private nbSearchService:NbSearchService,
              private operatorService:OperatorService) {
    this.nbSearchService.onSearchSubmit()
      .subscribe( (filter:any) => {
        this.operatorService.findClientByPhoneNumber(filter)
          .then(res => {
            this.customerList = res;
          })
      });
  }

  ngOnInit(): void {
  }

}
