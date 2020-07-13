/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ErrorInterceptor} from "./providers/interceptors/error.interceptor";
import {AngularYandexMapsModule, IConfig, YA_MAP_CONFIG} from "angular8-yandex-maps";
import {NgxMaskModule, IConfig as NGXIConfig} from "ngx-mask";
import {NbDateFnsDateModule} from "@nebular/date-fns";
import {kk} from "date-fns/locale";
import {KeycloakInterceptor} from "./providers/interceptors/keycloak.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const mapKey:IConfig = {
  apikey: 'ad85e06d-b5a4-44d6-8ff6-94cee0c458e6',
  lang:"ru_RU"
};

const maskConfig: Partial<NGXIConfig> = {
  validation: false,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(maskConfig),
    AngularYandexMapsModule.forRoot(mapKey),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: kk},
      formatOptions: { locale: kk}
    }),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: KeycloakInterceptor, multi: true},
    { provide: YA_MAP_CONFIG, useValue: mapKey}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
