import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionPage } from './action.page';

const routes: Routes = [
  {
    path: '',
    component: ActionPage,
    children: [
      {
        path: 'done-orders',
        loadChildren: () => import('../done-orders/done-orders.module')
          .then(m => m.DoneOrdersPageModule)
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
