import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonOrderListGroupComponent} from "./ion-order-list-group/ion-order-list-group.component";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    IonOrderListGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    IonOrderListGroupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
