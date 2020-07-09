import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoneOrdersPage } from './done-orders.page';

const routes: Routes = [
  {
    path: '',
    component: DoneOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoneOrdersPageRoutingModule {}
