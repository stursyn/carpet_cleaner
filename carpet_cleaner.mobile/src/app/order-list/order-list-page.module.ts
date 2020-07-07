import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {OrderListPageRoutingModule} from "./order-list-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {OrderListPage} from "./order-list.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderListPageRoutingModule,
    TranslateModule
  ],
  declarations: [OrderListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderListPageModule {

}