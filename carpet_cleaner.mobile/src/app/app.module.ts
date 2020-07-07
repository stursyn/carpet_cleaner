import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularYandexMapsModule, IConfig, YA_MAP_CONFIG} from "angular8-yandex-maps";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import { TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { ErrorInterceptor} from "./providers/interceptors/error.interceptor";


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const mapKey:IConfig = {
  apikey: 'ad85e06d-b5a4-44d6-8ff6-94cee0c458e6',
  lang:"ru_RU"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularYandexMapsModule.forRoot(mapKey),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: YA_MAP_CONFIG, useValue: mapKey}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
