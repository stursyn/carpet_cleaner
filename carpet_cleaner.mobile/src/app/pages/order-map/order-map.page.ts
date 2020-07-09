import { Component, OnInit } from '@angular/core';
import {OrderShortRecord} from "../../models/OrderShortRecord";
import {DeliverService} from "../../services/deliver.service";
import {OrderRouteWay} from "../../models/OrderRouteWay";
import {ILoadEvent} from "angular8-yandex-maps";
import {NavigationService} from "../../services/navigation.service";

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
              private navigationService:NavigationService) {
    this.navigationService.orderMapRefreshObservable
      .subscribe(value => {
        if(value) this.loadData();
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
        });
      });

  }

  mapLoad(event:ILoadEvent) {
    let ymaps = event.ymaps;
    ymaps.geolocation.get({
      provider: 'yandex',
      autoReverseGeocode: true
    }).then(res=> {
        this.myLocation = res.geoObjects.get(0).geometry._coordinates;
      }
    );
  }
}
