import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionPage } from './action.page';
import {AuthGuard} from "../../providers/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ActionPage,
    children: [
      {
        path: 'done-orders',
        loadChildren: () => import('../done-orders/done-orders.module')
          .then(m => m.DoneOrdersPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'order-add',
        loadChildren: () => import('../order-add/order-add.module')
          .then(m => m.OrderAddPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/actions/done-orders'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionPageRoutingModule {}
