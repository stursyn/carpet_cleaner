import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'; 1
import {TranslateModule} from "@ngx-translate/core";
import {ThemeModule} from "../@theme/theme.module";
import {NbCardModule, NbLayoutModule, NbListModule, NbSearchModule, NbUserModule} from "@nebular/theme";
import {OperatorComponent} from "./operator.component";
import {OperatorRoutingModule} from "./operator-routing.module";
import {StartPageModule} from "./start_page/start_page.module";
import {OrderModule} from "./order/order.module";


@NgModule({
  declarations: [
    OperatorComponent
  ],
  imports: [
    TranslateModule,
    NbUserModule,
    NbCardModule,
    NbListModule,
    NbLayoutModule,
    OperatorRoutingModule,
    StartPageModule,
    OrderModule,
    ThemeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperatorModule { }
