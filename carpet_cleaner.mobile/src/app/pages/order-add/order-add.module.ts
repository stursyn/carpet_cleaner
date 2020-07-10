import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderAddPageRoutingModule } from './order-add-routing.module';

import { OrderAddPage } from './order-add.page';
import {TranslateModule} from "@ngx-translate/core";
import {NgModule} from "@angular/core";
import {AngularYandexMapsModule} from "angular8-yandex-maps";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAddPageRoutingModule,
    TranslateModule,
    AngularYandexMapsModule
  ],
  declarations: [OrderAddPage]
})
export class OrderAddPageModule {}
