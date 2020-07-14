import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CustomerRecord} from "../model/CustomerRecord";
import {CustomerService} from "../../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NbSearchService} from "@nebular/theme";

@Component({
  selector: 'app-start-page',
  templateUrl: './start_page.component.html',
  styleUrls: ['./start_page.component.scss'],
})
export class StartPageComponent implements OnInit {

  phoneNumber:string;
  source: CustomerRecord[];
  showClientNotFound:boolean = false;

  constructor(private customerService: CustomerService,
              private nbSearchService: NbSearchService,
              private router:Router,
              private route:ActivatedRoute,
              private changeDet: ChangeDetectorRef) {
    this.nbSearchService.onSearchActivate()
      .subscribe(value => {
        this.source = [];
        this.showClientNotFound = false;
      });

    this.nbSearchService.onSearchSubmit()
      .subscribe( (filter:any) => {
         this.loadData(filter)
      });
  }

  loadData(phoneNumber:any) {
    if(phoneNumber) {
      this.phoneNumber = phoneNumber.term;
      this.customerService
        .searchByPhoneNumber(this.phoneNumber).then(res => {
        this.source = res;
        if(this.source.length == 0) {
          this.showClientNotFound = true;
        } else {
          this.showClientNotFound = false;
        }
        this.changeDet.detectChanges();
      }, error => {
          this.showClientNotFound = true;
      });
    } else {
      this.showClientNotFound = true;
    }
  }

  ngOnInit(): void {
  }

  addNewOrder(id: string = null) {
    this.router.navigate(['createOrder'], {relativeTo: this.route.parent, queryParams: { customerId: id}})
      .then(nav => console.log(nav),
        error => {console.log(error)});
  }
}
