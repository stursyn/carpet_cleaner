import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
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

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private session: SessionService,
    private http: HttpClient,
    private apiService: ApiService ) {

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
  }

  ngOnInit(): void {
    this.apiService.api = new ApiProd(this.http)
  }
}
