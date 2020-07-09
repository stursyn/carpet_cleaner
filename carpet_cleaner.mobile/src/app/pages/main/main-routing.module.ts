import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPage} from './main.page';
import {OrderListPageModule} from "../order-list/order-list-page.module";

const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'order-list',
        loadChildren: () => import('../order-list/order-list-page.module')
          .then(m => OrderListPageModule)
      },
      {
        path: 'order-map',
        loadChildren: () => import('../order-map/order-map.module')
          .then(m => m.OrderMapPageModule)
      },
      {
        path: '',
        redirectTo: '/main/order-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/order-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
