import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoneOrdersPageRoutingModule } from './done-orders-routing.module';

import { DoneOrdersPage } from './done-orders.page';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DoneOrdersPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DoneOrdersPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoneOrdersPageModule {}
