import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbSelectModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../../@theme/theme.module';
import {OrderComponent} from "./order.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import {NbDateFnsDateModule} from "@nebular/date-fns";

@NgModule({
  imports: [
    TranslateModule,
    FormsModule,
    NbListModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbDatepickerModule,
    NbDateFnsDateModule,
    NbSelectModule,
    ThemeModule,
    Ng2SmartTableModule,
    AngularYandexMapsModule,
  ],
  declarations:
    [
      OrderComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderModule { }
