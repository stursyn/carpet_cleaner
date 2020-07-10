import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OrderShortRecord} from "../../models/OrderShortRecord";
import {DeliverService} from "../../services/deliver.service";
import {OrderRouteWay} from "../../models/OrderRouteWay";
import {NavigationService} from "../../services/navigation.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-order-map',
  templateUrl: './order-map.page.html',
  styleUrls: ['./order-map.page.scss'],
})
export class OrderMapPage implements OnInit {

  needToDeliveryOrderList: OrderShortRecord[];
  needToPickUpOrderList: OrderShortRecord[];

  routeList: OrderRouteWay[];
  myLocation = [51.128207, 71.430411];

  constructor(private deliverService:DeliverService,
              private navigationService:NavigationService,
              private geolocation:Geolocation,
              private changeDetector : ChangeDetectorRef) {
    this.navigationService.orderMapRefreshObservable
      .subscribe(value => {
        if(value) this.loadData();
      });

    this.geolocation.getCurrentPosition()
      .then( resp=>{
        let geo = [];
        geo.push(resp.coords.latitude);
        geo.push(resp.coords.longitude);
        this.myLocation = geo;
        this.changeDetector.detectChanges();
      }, error => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.needToDeliveryOrderList = [];
    this.needToPickUpOrderList = [];
    this.routeList = [];

    this.deliverService.loadOrderByStatus("CREATED")
      .then(res => {
        this.needToPickUpOrderList = res;
        this.needToPickUpOrderList.forEach(value => {
          let referencePoint = [];
          referencePoint.push(this.myLocation);
          referencePoint.push([value.latitude, value.longitude]);

          this.routeList.push(new OrderRouteWay({ referencePoints: referencePoint}));
          this.changeDetector.detectChanges();
        });
      });
    this.deliverService.loadOrderByStatus("TO_DELIVER")
      .then(res => {
        this.needToDeliveryOrderList = res;
        this.needToDeliveryOrderList.forEach(value => {
          let referencePoint = [];
          referencePoint.push(this.myLocation);
          referencePoint.push([value.latitude, value.longitude]);

          this.routeList.push(new OrderRouteWay({ referencePoints: referencePoint}));
          this.changeDetector.detectChanges();
        });
      });

  }
}
