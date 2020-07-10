import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderMapPageRoutingModule } from './order-map-routing.module';

import { OrderMapPage } from './order-map.page';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import {TranslateModule} from "@ngx-translate/core";
import {Geolocation} from "@ionic-native/geolocation/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderMapPageRoutingModule,
    AngularYandexMapsModule,
    TranslateModule,
  ],
  declarations: [OrderMapPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Geolocation
  ]
})
export class OrderMapPageModule {}
