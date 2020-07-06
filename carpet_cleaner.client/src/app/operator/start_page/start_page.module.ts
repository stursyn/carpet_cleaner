import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbSearchModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import {StartPageComponent} from "./start_page.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    TranslateModule,
    FormsModule,
    NbListModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbSearchModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations:
  [
    StartPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartPageModule { }
