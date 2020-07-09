import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    MainRoutingModule,
    TranslateModule,
    ThemeModule,
    NbMenuModule
  ],
  declarations: [
    MainComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {
}
