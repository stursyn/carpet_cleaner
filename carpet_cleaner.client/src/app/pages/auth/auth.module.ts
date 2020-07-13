import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule
} from "@nebular/theme";
import {NbAuthModule} from "@nebular/auth";
import {AuthRoutingModule} from "./auth-routing.module";
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    AuthRoutingModule,
    NbAuthModule,
    TranslateModule
  ]
})
export class AuthModule { }
