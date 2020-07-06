import {Component, OnInit} from '@angular/core';
import {CustomerRecord} from "../model/CustomerRecord";
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {error} from "selenium-webdriver";

@Component({
  selector: 'app-start-page',
  templateUrl: './start_page.component.html',
  styleUrls: ['./start_page.component.scss'],
})
export class StartPageComponent implements OnInit {

  phoneNUmber:string;
  source: CustomerRecord[];

  constructor(private customerService: CustomerService,
              private router:Router,
              private route:ActivatedRoute) {
    this.customerService.getPhoneNumber.subscribe(phoneNumber=> {
      this.loadData(phoneNumber)
    })
  }

  loadData(phoneNumber:string) {
    if(phoneNumber) {
      this.phoneNUmber = phoneNumber;
      this.customerService
        .searchByPhoneNumber(phoneNumber).then(res => {
        this.source = res;
      });
    }
  }

  ngOnInit(): void {
  }

  addNewOrder(id: string = null) {
    console.log(this.route);
    this.router.navigate(['createOrder'], {relativeTo: this.route.parent, queryParams: { customerId: id}})
      .then(nav => console.log(nav),
        error => console.log(error));
  }
}
