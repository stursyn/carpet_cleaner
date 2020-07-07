import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularYandexMapsModule, IConfig, YA_MAP_CONFIG} from "angular8-yandex-maps";

const mapKey:IConfig = {
  apikey: 'ad85e06d-b5a4-44d6-8ff6-94cee0c458e6',
  lang:"ru_RU"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    AngularYandexMapsModule.forRoot(mapKey)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: YA_MAP_CONFIG, useValue: mapKey}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
