import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {NotFoundComponent} from "../example_pages/miscellaneous/not-found/not-found.component";
import {OperatorComponent} from "./operator.component";
import {StartPageComponent} from "./start_page/start_page.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
  {
    path: '',
    component: OperatorComponent,
    children: [
      {
        path: 'startPage',
        component: StartPageComponent
      },
      {
        path: 'createOrder',
        component: OrderComponent
      },
      {
        path: '',
        redirectTo: '/operator/startPage'
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorRoutingModule {
}
