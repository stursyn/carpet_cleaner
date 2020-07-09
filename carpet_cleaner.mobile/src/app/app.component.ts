import {Component, OnInit} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./services/api.service";
import {ApiProd} from "./implementations/api/apiProd";
import {SessionService} from "./services/session.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    navigate:any;

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private session: SessionService,
    private http: HttpClient,
    private apiService: ApiService,
    private menu: MenuController) {

    this.initializeApp();
  }

  initializeApp() {
    this.translate.setDefaultLang('ru');
    this.session.registerCulture('ru-KZ');
    this.session.registerCulture('kz-KZ');

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.navigate =
      [
        {
          title : 'orders',
          url   : "/main/order-list",
          iconSrc  :  "assets/order.svg",
          icon : null
        },
        {
          title : 'doneOrders',
          url   : "/actions/done-orders",
          iconSrc  :  "assets/order-done.svg",
          icon : null
        },
        {
          title : 'addNewOrder',
          url   : "/main/order-map",
          iconSrc  :  "assets/order-add.svg",
          icon : null
        }
      ];
  }

  ngOnInit(): void {
    this.apiService.api = new ApiProd(this.http)
  }
}
